import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Orders } from '../Interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private API_URL = `${environment.API_URL}/order`; // URL to web api
  constructor(private http: HttpClient) {}

  headerFunc() {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    let options = { headers: headers };
    return options;
  }
  //get order
  getOrder(): Observable<Orders> {
    return this.http.get<Orders>(this.API_URL, this.headerFunc()).pipe(
      tap((_) => this.log('getProduct')),
      catchError(this.handleError<Orders>('getProducts'))
    );
  }
  //createOrder
  createOrder(formData: any) {
    return this.http.post(this.API_URL, formData, this.headerFunc()).pipe(
      tap((_) => this.log('createOrder')),
      catchError(this.handleError<Orders>('createOrder'))
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
