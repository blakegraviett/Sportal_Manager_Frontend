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
  allEventWorkers: any = [];
  allEvents: Array<any>;
  allTeams: any = [''];
  allWorkers: Array<any> = [''];
  areYouSure: boolean = false;
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
  async selectOption(event: any) {
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
    this.adminService.getAllWorkers().subscribe(
      (res) => {
        this.allWorkers = res.data.users;
      },
      (error) => {
        console.error('Error fetching data:', error); // Handle error
      }
    );
    this.allEventWorkers = [];
    for (const worker of this.selectedEvent.workers) {
      this.adminService.getSingleWorker(worker).subscribe(
        (response) => {
          this.allEventWorkers.push(response.data);
        },
        (error) => {
          console.error('Error:', error); // Handle error
        }
      );
    }
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
    const dateString = this.updateEvent.value.date;

    // Create a new Date object from the date string
    const dateObject = new Date(dateString);

    // Get the month and day from the date object
    const month = dateObject.toLocaleString('default', { month: 'long' });
    const day = dateObject.getDate();

    const updatedEvent = {
      id: this.selectedEvent._id,
      name: this.updateEvent.value.name,
      description: this.updateEvent.value.description,
      link: this.updateEvent.value.link,
      awayTeam: this.updateEvent.value.awayTeam,
      homeTeam: this.updateEvent.value.homeTeam,
      date: `${month} ${day} at ${this.convertToAmPm(
        this.updateEvent.value.startTime
      )}`,
    };

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
    if (this.updateEvent.value.startTime === '') {
      updatedEvent.date = this.selectedEvent.date;
    }

    this.adminService
      .updateEvent(
        updatedEvent.id,
        updatedEvent.name,
        updatedEvent.description,
        updatedEvent.awayTeam,
        updatedEvent.homeTeam,
        updatedEvent.link,
        updatedEvent.date
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

  submitAddWorker() {
    const workersEmails = [];
    for (const worker of this.allEventWorkers) {
      workersEmails.push(worker.email);
    }

    workersEmails.push(this.addWorkerForm.value.email);
    this.adminService
      .updateEventWorkers(this.selectedEvent._id, workersEmails)
      .subscribe(
        (response) => {
          location.reload();
        },
        (error) => {
          console.error('Error:', error); // Handle error
        }
      );
  }
  submitRemoveWorker() {
    console.log(this.removeWorkerForm.value);
    let workersEmails = [];
    for (const worker of this.allEventWorkers) {
      workersEmails.push(worker.email);
    }
    workersEmails = workersEmails.filter(
      (email) => email !== this.removeWorkerForm.value.email
    );

    this.adminService
      .updateEventWorkers(this.selectedEvent._id, workersEmails)
      .subscribe(
        (response) => {
          location.reload();
        },
        (error) => {
          console.error('Error:', error); // Handle error
        }
      );
  }

  areYouSureFunc() {
    if (this.selectedEvent.name === '') {
      return;
    }
    this.areYouSure = !this.areYouSure;
  }

  deleteEvent() {
    this.adminService.deleteEvent(this.selectedEvent._id).subscribe(
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

  addWorkerForm = new FormGroup({
    email: new FormControl(''),
  });

  removeWorkerForm = new FormGroup({
    email: new FormControl(''),
  });
  convertToAmPm(time) {
    if (time === '') {
      return '';
    }
    // Parse the time string into hours and minutes
    const [hours, minutes] = time.split(':').map(Number);

    // Determine AM or PM and convert hours accordingly
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12; // Convert 0 to 12

    // Format the time string in AM/PM format
    const amPmTime = `${displayHours}:${minutes
      .toString()
      .padStart(2, '0')} ${period}`;

    return amPmTime;
  }
}
