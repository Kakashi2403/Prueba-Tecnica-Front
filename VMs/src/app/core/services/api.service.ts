import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroments';
import { response } from 'express';
import { CookieService } from '../services/cookeeService';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private getHeaders(customHeaders?: HttpHeaders): HttpHeaders {
    const token = this.cookieService.get('appToken'); // ✅ CORRECTO
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    });
  
    if (customHeaders) {
      customHeaders.keys().forEach(key => {
        headers = headers.set(key, customHeaders.get(key)!);
      });
    }
  
    return headers;
  }
  
  

  private buildParams(paramsObj?: any): HttpParams {
    let params = new HttpParams();
    if (paramsObj) {
      Object.keys(paramsObj).forEach(key => {
        const value = paramsObj[key];
        if (value !== null && value !== undefined) {
          params = params.set(key, value);
        }
      });
    }
    return params;
  }

  get<T>(endpoint: string, params?: any, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(`${endpoint}`, {
      headers: this.getHeaders(headers),
      params: this.buildParams(params)
    });
  }

  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${endpoint}`, body, {
      headers: this.getHeaders(headers)
    });
  }

  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${endpoint}`, body, {
      headers: this.getHeaders(headers)
    });
  }

  delete<T>(endpoint: string, params?: any, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(`${endpoint}`, {
      headers: this.getHeaders(headers),
      params: this.buildParams(params)
    });
  }
}
