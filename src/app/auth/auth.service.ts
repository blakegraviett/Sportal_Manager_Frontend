import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = 'https://api.sportalmanager.com/api/v1/';
  constructor(private http: HttpClient) {}
  isLogged = new Subject<Boolean>();

  getUserProfile(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };
    return this.http.get<any>(`${this.apiUrl}auth/user-profile`, options);
  }

  loginUser(email, password): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const credentials = { email, password };
    const options = { headers, withCredentials: true };
    return this.http.post<any>(
      `${this.apiUrl}auth/login`,
      credentials,
      options
    );
  }

  registerUser(name, email, password, org): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const credentials = { name, email, password, org };
    const options = { headers, withCredentials: true };
    return this.http.post<any>(
      `${this.apiUrl}auth/register`,
      credentials,
      options
    );
  }

  logoutUser(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };
    return this.http.delete<any>(`${this.apiUrl}auth/logout`, options);
  }

  verifyEmail(email: string, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      `${this.apiUrl}auth/verify-email?token=${token}&email=${email}`,
      {
        headers,
        withCredentials: true,
      }
    );
  }

  getAllOrgs(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };
    return this.http.get<any>(`${this.apiUrl}orgs`, options);
  }
}
