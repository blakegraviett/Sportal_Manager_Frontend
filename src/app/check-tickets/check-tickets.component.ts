import { Component } from '@angular/core';
import { EventsService } from '../events/events.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-tickets',
  templateUrl: './check-tickets.component.html',
  styleUrl: './check-tickets.component.scss',
})
export class CheckTicketsComponent {
  msg: string;
  isBad: boolean;
  constructor(
    private eventService: EventsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.eventService.checkTickets(id).subscribe(
        (response) => {
          this.msg = 'Ticket Successful! Enjoy your stay! 🥳';
          this.isBad = false;
        },
        (error) => {
          this.msg =
            'Ticket has already been used! Sorry! Please try a diffrent Ticket.';
          this.isBad = true;
        }
      );
    });
  }
}
