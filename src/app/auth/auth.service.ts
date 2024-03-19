import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = 'https://event-manager-03bk.onrender.com/api/v1/';
  constructor(private http: HttpClient) {}
  isLogged = new Subject<Boolean>();
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

  // Get current user from local storage
  getCurrentUser() {
    return localStorage.getItem('currentUser');
  }

  clearLocalStorageAfterDuration() {
    const lastStoredTime = localStorage.getItem('lastStoredTime');
    if (lastStoredTime) {
      const currentTime = new Date().getTime();
      const storedTime = new Date(parseInt(lastStoredTime, 10));
      const elapsedMilliseconds = currentTime - storedTime.getTime();
      const twelveHoursMilliseconds = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

      if (elapsedMilliseconds >= twelveHoursMilliseconds) {
        localStorage.clear();
        console.log('Local storage cleared after 12 hours');
      }
    } else {
      // Set the current time in local storage
      localStorage.setItem('lastStoredTime', new Date().getTime().toString());
    }
  }
}
