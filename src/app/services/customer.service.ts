import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Customer, CustomerData } from '../Interfaces/customer';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private API_URL = `${environment.API_URL}/customer`; // URL to web api
  constructor(private http: HttpClient) {}
  headerFunc() {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    let options = { headers: headers };
    return options;
  }

  //search customer by id
  searchCustomer(member_id: any): Observable<CustomerData> {
    return this.http
      .get<CustomerData>(
        `${this.API_URL}/search/${member_id}`,
        this.headerFunc()
      )
      .pipe(
        tap((_) => this.log('searchCustomer')),
        catchError(this.handleError<CustomerData>('searchCustomer'))
      );
  }

  getCustomer(page: any, size: any) {
    return this.http
      .get(`${this.API_URL}?page=${page}&size=${size}`, this.headerFunc())
      .pipe(
        tap((_) => this.log('getCustomer')),
        catchError(this.handleError<Customer>('getCustomer'))
      );
  }
  getCustomerById(id: any): Observable<CustomerData> {
    return this.http
      .get<CustomerData>(`${this.API_URL}/${id}`, this.headerFunc())
      .pipe(
        tap((_) => this.log('getCustomerById')),
        catchError(this.handleError<CustomerData>('getCustomerById'))
      );
  }
  //createCustomer
  createCustomer(formData: any, customer_id = '') {
    if (customer_id !== '') {
      return this.http
        .put(`${this.API_URL}/${customer_id}`, formData, this.headerFunc())
        .pipe(
          tap((_) => this.log('updateCustomerData')),
          catchError(this.handleError<CustomerData>('updateCustomerData'))
        );
    } else {
      return this.http.post(this.API_URL, formData, this.headerFunc()).pipe(
        tap((_) => this.log('createCustomerData')),
        catchError(this.handleError<CustomerData>('createCustomerData'))
      );
    }
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
