import { Component, Input } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent {
  @Input() events;
  homeTeam;
  awayTeam;
  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.getTeamNameAndIcon();
  }

  getTeamNameAndIcon() {
    this.eventsService
      .getSingleTeam(this.events.teams.homeTeam)
      .subscribe((response) => {
        this.homeTeam = response.data;
      });
    this.eventsService
      .getSingleTeam(this.events.teams.awayTeam)
      .subscribe((response) => {
        this.awayTeam = response.data;
      });
  }

  getLivePeriodScore() {
    const periodArr = this.events.period;
    const mostRecentString = periodArr[periodArr.length - 1];

    return mostRecentString;
  }
}
