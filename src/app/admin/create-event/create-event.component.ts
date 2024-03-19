import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
import { log } from 'node:console';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss',
})
export class CreateEventComponent {
  constructor(private adminService: AdminService, private router: Router) {}

  allTeams: any = [''];
  allWorkers: Array<any> = [''];

  createEventFrom = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    homeTeam: new FormControl(''),
    awayTeam: new FormControl(''),
    sport: new FormControl(''),
    link: new FormControl(''),
    workerEmails: new FormControl(''),
    startTime: new FormControl(''),
    startDate: new FormControl(''),
    price: new FormControl(''),
    ticketAmount: new FormControl(''),
  });

  ngOnInit() {
    this.adminService.getAllTeams().subscribe(
      (response) => {
        this.allTeams = response.data;
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
  }

  onSubmit() {
    const dateString = '2024-03-19';

    // Create a new Date object from the date string
    const dateObject = new Date(dateString);

    // Get the month and day from the date object
    const month = dateObject.toLocaleString('default', { month: 'long' });
    const day = dateObject.getDate();

    this.adminService
      .createEvent(
        this.createEventFrom.value.name,
        this.createEventFrom.value.description,
        `${month} ${day} at ${this.convertToAmPm(
          this.createEventFrom.value.startTime
        )}`,
        this.createEventFrom.value.sport,
        this.createEventFrom.value.link,
        this.createEventFrom.value.price,
        this.createEventFrom.value.ticketAmount,
        this.createEventFrom.value.homeTeam,
        this.createEventFrom.value.awayTeam,
        this.createEventFrom.value.workerEmails
      )
      .subscribe(
        (response) => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/events/view']);
            });
        },
        (error) => {
          // TODO MAKE AN ERROR ALERT
          console.log('try again');

          console.error('Error:', error); // Handle error
        }
      );
  }

  convertToAmPm(time) {
    if (time === '') {
      // TODO MAKE THE ERROR ALERT GO OFF
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
