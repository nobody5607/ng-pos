import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Data, Products } from '../Interfaces/products';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = `${environment.API_URL}/product`; // URL to web api
  constructor(private http: HttpClient) {}

  headerFunc() {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    let options = { headers: headers };
    return options;
  }

  //get product
  getProduct(): Observable<Products> {
    return this.http.get<Products>(this.API_URL).pipe(
      tap((_) => this.log('getProduct')),
      catchError(this.handleError<Products>('getProducts'))
    );
  }
  getAttribute() {
    return this.http.get(this.API_URL + '/attribute').pipe(
      tap((_) => this.log('getattribute')),
      catchError(this.handleError<Products>('getattribute'))
    );
  }

  getProuctByBarcode(barcode: any): Observable<Products> {
    return this.http.get<Products>(`${this.API_URL}/barcode/${barcode}`).pipe(
      tap((_) => this.log('getProduct')),
      catchError(this.handleError<Products>('getProducts'))
    );
  }

  //createProduct
  createProduct(formData: any) {
    return this.http.post(this.API_URL, formData, this.headerFunc()).pipe(
      tap((_) => this.log('createOrder')),
      catchError(this.handleError<Data>('createOrder'))
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
