import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Products } from '../Interfaces/products';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = `${environment.API_URL}/product`; // URL to web api
  constructor(private http: HttpClient) {}

  //get product
  getProduct(): Observable<Products> {
    return this.http.get<Products>(this.API_URL).pipe(
      tap((_) => this.log('getProduct')),
      catchError(this.handleError<Products>('getProducts'))
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
