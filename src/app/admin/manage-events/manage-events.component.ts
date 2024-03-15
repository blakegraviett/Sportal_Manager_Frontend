import { Component } from '@angular/core';
import { EventsService } from '../../events/events.service';

@Component({
  selector: 'app-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrl: './manage-events.component.scss',
})
export class ManageEventsComponent {
  selectedOption: string = 'Select an option';
  isDropdownOpen: boolean = false;
  homeTeam = {
    name: '',
    logo: '',
  };
  awayTeam = {
    name: '',
    logo: '',
  };
  selectedEvent: any = {
    name: '',
    description: '',
    date: '',
    startTime: '',
    link: '',
    ticketLink: '',
  };
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(event: any) {
    this.selectedOption = event.name;
    this.toggleDropdown();
    this.selectedEvent = event;
    this.getTeamNameAndIcon(event);
  }

  constructor(private eventService: EventsService) {}
  allEvents: Array<any>;
  ngOnInit() {
    this.eventService.getAllEvents().subscribe(
      (res) => {
        this.allEvents = res.data;
        console.log('res.data:', res.data);
      },
      (error) => {
        console.error('Error fetching data:', error); // Handle error
      }
    );
  }

  saveChanges() {
    // Implement logic to save changes to event options
    // console.log('Event Name:');
    // console.log('Event Date:');
    // Save changes to other event options
  }

  getTeamNameAndIcon(events) {
    this.eventService.getSingleTeam(events.teams[0]).subscribe((response) => {
      this.homeTeam = response.data;
    });
    this.eventService.getSingleTeam(events.teams[1]).subscribe((response) => {
      this.awayTeam = response.data;
    });
  }
}
