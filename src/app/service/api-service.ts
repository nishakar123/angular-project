import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  //private baseUrl = 'http://localhost:3000'; // Local API base
  //private baseUrl = 'https://jsonplaceholder.typicode.com/'; // Change this to your API base
  private baseUrl = 'http://localhost:8080/api/spring-boot-new-features';

  constructor(private http: HttpClient) {}

  // Generic GET request
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params });
  }

  // Generic POST request
  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { headers });
  }

  // Generic PUT request
  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, { headers });
  }

  // Generic PATCH request
  patch<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body, { headers });
  }

  // Generic DELETE request
  delete<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { params });
  }
}
