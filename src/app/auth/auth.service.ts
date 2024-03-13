import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = 'https://event-manager-03bk.onrender.com/api/v1/auth';
  constructor(private http: HttpClient) {}

  loginUser(email, password): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const credentials = { email, password };
    const options = { headers, withCredentials: true };
    return this.http.post<any>(`${this.apiUrl}/login`, credentials, options);
  }
}
