import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl: string = 'https://api.sportalmanager.com/api/v1/';
  constructor(private http: HttpClient) {}

  // create a new event
  createEvent(
    name,
    description,
    date,
    sport,
    link,
    price,
    ticketAmount,
    homeTeam,
    awayTeam,
    workerEmails
  ) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const credentials = {
      name,
      description,
      date,
      sport,
      link,
      price,
      ticketAmount,
      homeTeam,
      awayTeam,
      workerEmails,
    };
    const options = { headers, withCredentials: true };
    return this.http.post(`${this.apiUrl}events`, credentials, options);
  }
  // update an event
  updateEvent(id, name, description, awayTeam, homeTeam, link, date) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const credentials = { name, description, awayTeam, homeTeam, link, date };
    const options = { headers, withCredentials: true };
    return this.http.patch(`${this.apiUrl}events/${id}`, credentials, options);
  }
  updateEventWorkers(id, workers) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const credentials = { workers };
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
  updateScore(id, homeTeamScore, awayTeamScore): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const credentials = { homeTeamScore, awayTeamScore };
    const options = { headers, withCredentials: true };
    return this.http.patch<any>(
      `${this.apiUrl}events/score/${id}`,
      credentials,
      options
    );
  }

  uploadImage(img: File): Observable<any> {
    const formData = new FormData();
    formData.append('img', img);
    const options = { withCredentials: true };
    return this.http.post<any>(
      `${this.apiUrl}teams/upload-image`,
      formData,
      options
    );
  }
  createTeam(name, logo): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const credentials = { name, logo };
    const options = { headers, withCredentials: true };
    return this.http.post<any>(`${this.apiUrl}teams`, credentials, options);
  }

  deleteTeam(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };
    return this.http.delete(`${this.apiUrl}teams/${id}`, options);
  }
  sendEmail(id, subject, body, isIndividual): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const credentials = { subject, body, isIndividual };
    const options = { headers, withCredentials: true };
    return this.http.post<any>(
      `${this.apiUrl}events/email-workers/${id}`,
      credentials,
      options
    );
  }
}
