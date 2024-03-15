import { Component } from '@angular/core';
import { EventsService } from '../events.service';
import { ViewAllEvents } from '../events.model';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrl: './view-events.component.scss',
})
export class ViewEventsComponent {
  isUnauthorized: Boolean = false;
  constructor(private eventsService: EventsService) {}
  eventsArray: Array<ViewAllEvents> = [];
  ngOnInit() {
    this.eventsService.getAllEvents().subscribe(
      (response) => {
        // Handle successful login
        console.log('response:', response);
        this.eventsArray = response.data;
      },
      (error) => {
        this.isUnauthorized = true;
        // console.error('Login error', error);
      }
    );
  }
}
