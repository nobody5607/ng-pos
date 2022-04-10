import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = `${environment.API_URL}/auth/login`; // URL to web api

  constructor(private http: HttpClient) {}
  getUserInfo() {
    let user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
  login(username: string, password: string) {
    let user = window.btoa(username + ':' + password);
    let headers = new HttpHeaders({
      version: '1.0',
      appname: 'cn-pos',
      Authorization: `Basic ${user}`,
    });
    let options = { headers: headers };

    return this.http.post(this.API_URL, {}, options).pipe(
      tap((res: any) => {
        if (res.status == 'nok') {
          alert('กรุณาตรวจสอบ Email หรือ Password');
        } else {
          return res;
        }
      }),
      catchError(this.handleError('createOrder'))
    );
  }

  private log(message: string) {
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
