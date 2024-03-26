import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  isLoading: boolean = false;
  allWorkers: Array<any> = [''];
  error: String;
  isError: Boolean = false;

  createEventFrom = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    homeTeam: new FormControl('', Validators.required),
    awayTeam: new FormControl('', Validators.required),
    sport: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    workerEmails: new FormControl(''),
    startTime: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    price: new FormControl(null, Validators.required),
    ticketAmount: new FormControl(null, Validators.required),
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
    this.isLoading = true;

    if (this.createEventFrom.value.ticketAmount > 999) {
      this.isError = true;
      this.error = 'Ticket Amount must be less than 999';
      return;
    }

    const dateString = this.createEventFrom.value.startDate;

    // Create a new Date object from the date string
    const dateObject = new Date(dateString);

    // Get the month and day from the date object
    const month = dateObject.toLocaleString('default', { month: 'long' });
    const day = dateObject.getDate() + 1;

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
          this.isLoading = false;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/events/view']);
            });
        },
        (error) => {
          this.isLoading = false;
          this.isError = true;
          this.error =
            'Please try again, if having trouble contact us at sportalmanager@gmail.com';
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
