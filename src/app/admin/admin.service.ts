import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl: string = 'https://event-manager-03bk.onrender.com/api/v1/';
  constructor(private http: HttpClient) {}

  // update an event
  updateEvent(id, name, description, awayTeam, homeTeam, link) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const credentials = { name, description, awayTeam, homeTeam, link };
    const options = { headers, withCredentials: true };
    return this.http.patch(`${this.apiUrl}events/${id}`, credentials, options);
  }
  updateEventWorkers(id, workers) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const credentials = { workers };
    console.log('workers:', workers);

    const options = { headers, withCredentials: true };
    return this.http.patch(`${this.apiUrl}events/${id}`, credentials, options);
  }
  // get all workers in an event
  getAllWorkers() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };
    return this.http.get<any>(`${this.apiUrl}users`, options);
  }
  getSingleWorker(userId) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };
    return this.http.get<any>(`${this.apiUrl}users/${userId}`, options);
  }

  getAllTeams() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };
    return this.http.get<any>(`${this.apiUrl}teams`, options);
  }
  getSingleTeam(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };
    return this.http.get<any>(`${this.apiUrl}teams/${id}`, options);
  }

  deleteEvent(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };
    return this.http.delete(`${this.apiUrl}events/${id}`, options);
  }
}
