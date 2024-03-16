import { Component } from '@angular/core';
import { EventsService } from '../../events/events.service';
import { AdminService } from '../admin.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrl: './manage-events.component.scss',
})
export class ManageEventsComponent {
  // * DEFAULTS
  selectedOption: string = 'Select an option';
  isDropdownOpen: boolean = false;
  allUsers: any = [''];
  allEventWorkers: any = [''];
  allEvents: Array<any>;
  allTeams: any = [''];
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
    teams: {
      homeTeam: '',
      awayTeam: '',
    },
  };
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // * LOGIC
  // Once the dropdown is selected
  selectOption(event: any) {
    this.selectedOption = event.name;
    this.toggleDropdown();
    this.selectedEvent = event;
    this.getTeamNameAndIcon(event);

    this.adminService.getAllTeams().subscribe(
      (response) => {
        this.allTeams = response.data;
      },
      (error) => {
        console.error('Error:', error); // Handle error
      }
    );
    this.adminService
      .getSingleTeam(this.selectedEvent.teams.homeTeam)
      .subscribe(
        (response) => {
          this.selectedEvent.teams.homeTeam = response.data.name;
          console.log(':', this.selectedEvent.teams.homeTeam);
        },
        (error) => {
          console.error('Error:', error); // Handle error
        }
      );
    this.adminService
      .getSingleTeam(this.selectedEvent.teams.awayTeam)
      .subscribe(
        (response) => {
          this.selectedEvent.teams.awayTeam = response.data.name;
        },
        (error) => {
          console.error('Error:', error); // Handle error
        }
      );
    // get all avalible users
    // this.adminService.getAllWorkers().subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.allUsers = response.data.users;
    //   },
    //   (error) => {
    //     console.error('Error:', error); // Handle error
    //   }
    // );
  }

  constructor(
    private eventService: EventsService,
    private adminService: AdminService
  ) {}
  ngOnInit() {
    this.eventService.getAllEvents().subscribe(
      (res) => {
        this.allEvents = res.data;
      },
      (error) => {
        console.error('Error fetching data:', error); // Handle error
      }
    );
  }

  saveChanges() {
    const updatedEvent = {
      id: this.selectedEvent._id,
      name: this.updateEvent.value.name,
      description: this.updateEvent.value.description,
      link: this.updateEvent.value.link,
      awayTeam: this.updateEvent.value.awayTeam,
      homeTeam: this.updateEvent.value.homeTeam,
    };
    console.log('this.selectedEvent.name:', this.selectedEvent.name);

    if (updatedEvent.name === '') {
      updatedEvent.name = this.selectedEvent.name;
    }
    if (updatedEvent.description === '') {
      updatedEvent.description = this.selectedEvent.description;
    }
    if (updatedEvent.link === '') {
      updatedEvent.link = this.selectedEvent.link;
    }
    if (updatedEvent.awayTeam === '') {
      updatedEvent.awayTeam = this.selectedEvent.teams.awayTeam;
    }
    if (updatedEvent.homeTeam === '') {
      updatedEvent.homeTeam = this.selectedEvent.teams.homeTeam;
    }
    this.adminService
      .updateEvent(
        updatedEvent.id,
        updatedEvent.name,
        updatedEvent.description,
        updatedEvent.awayTeam,
        updatedEvent.homeTeam,
        updatedEvent.link
      )
      .subscribe(
        (response) => {
          location.reload();
        },
        (error) => {
          console.error('Error:', error); // Handle error
        }
      );
  }

  getTeamNameAndIcon(events) {
    this.eventService
      .getSingleTeam(events.teams.homeTeam)
      .subscribe((response) => {
        this.homeTeam = response.data;
      });
    this.eventService
      .getSingleTeam(events.teams.awayTeam)
      .subscribe((response) => {
        this.awayTeam = response.data;
      });
  }

  updateEvent = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    link: new FormControl(''),
    homeTeam: new FormControl(''),
    awayTeam: new FormControl(''),
    date: new FormControl(''),
    startTime: new FormControl(''),
  });
}
