import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}
  eventApiUrl: string = 'https://api.sportalmanager.com/api/v1/events';
  teamApiUrl: string = 'https://api.sportalmanager.com/api/v1/teams';
  getAllEvents(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.eventApiUrl}`, {
      headers,
      withCredentials: true,
    });
  }

  getSingleTeam(id: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.teamApiUrl}/${id}`, {
      headers,
      withCredentials: true,
    });
  }
}
