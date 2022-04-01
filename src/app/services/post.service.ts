import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Posts } from '../Interfaces/posts';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postUrl = `${environment.API_URL}/posts`; // URL to web api
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>(this.postUrl).pipe(
      tap((_) => this.log('fetched posts')),
      catchError(this.handleError<Posts[]>('getPosts', []))
    );
  }
  getPost(id: number): Observable<Posts> {
    const url = `${this.postUrl}/${id}`;
    return this.http.get<Posts>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Posts>(`getPost id=${id}`))
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
