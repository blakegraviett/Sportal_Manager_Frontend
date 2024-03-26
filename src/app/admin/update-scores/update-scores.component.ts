import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { EventsService } from '../../events/events.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-update-scores',
  templateUrl: './update-scores.component.html',
  styleUrl: './update-scores.component.scss',
})
export class UpdateScoresComponent {
  constructor(
    private eventsService: EventsService,
    private adminService: AdminService
  ) {}
  selectedOption: string = 'Select an event';
  isDropdownOpen: boolean = false;
  allEvents = [];
  allTeams = [];
  selectedEvent: any = {
    name: '',
    description: '',
    date: '',
    startTime: '',
    link: '',
    ticketLink: '',
    sport: '',
    period: '',
    teams: {
      homeTeam: '',
      awayTeam: '',
    },
  };
  homeTeam = {
    name: '',
    logo: '',
  };
  awayTeam = {
    name: '',
    logo: '',
  };
  ngOnInit() {
    this.eventsService.getAllEvents().subscribe(
      (response) => {
        this.allEvents = response.data;
      },
      (error) => {
        console.error('Error:', error); // Handle error
      }
    );
  }

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
  }

  updateScoreForm = new FormGroup({
    homeScore: new FormControl(''),
    awayScore: new FormControl(''),
  });

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getTeamNameAndIcon(events) {
    this.eventsService
      .getSingleTeam(events.teams.homeTeam)
      .subscribe((response) => {
        this.homeTeam = response.data;
      });
    this.eventsService
      .getSingleTeam(events.teams.awayTeam)
      .subscribe((response) => {
        this.awayTeam = response.data;
      });
  }

  onSubmit() {
    this.adminService
      .updateScore(
        this.selectedEvent._id,
        this.updateScoreForm.value.homeScore.toString(),
        this.updateScoreForm.value.awayScore.toString()
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
  getLivePeriodScore() {
    const periodArr = this.selectedEvent.period;
    const mostRecentString = periodArr[periodArr.length - 1];

    return mostRecentString;
  }
}
