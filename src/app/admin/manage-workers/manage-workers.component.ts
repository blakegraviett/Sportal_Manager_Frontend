import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { EventsService } from '../../events/events.service';

@Component({
  selector: 'app-manage-workers',
  templateUrl: './manage-workers.component.html',
  styleUrl: './manage-workers.component.scss',
})
export class ManageWorkersComponent {
  constructor(
    private enventService: EventsService,
    private adminService: AdminService
  ) {}
  allEvents;
  isLoading: boolean = false;
  isSuccess: boolean = false;
  isFailed: boolean = false;

  // email form
  emailForm = new FormGroup({
    event: new FormControl(null, [Validators.required]),
    subject: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    isIndividual: new FormControl(false), // Default value set to false
  });

  ngOnInit() {
    this.enventService.getAllEvents().subscribe(
      (response) => {
        this.allEvents = response.data;
      },
      (error) => {
        console.error('Error:', error); // Handle error
      }
    );
  }
  onSubmit() {
    this.isLoading = true;
    this.adminService
      .sendEmail(
        this.emailForm.value.event,
        this.emailForm.value.subject,
        this.emailForm.value.body,
        this.emailForm.value.isIndividual
      )
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.isSuccess = true;
        },
        (error) => {
          this.isLoading = false;
          this.isFailed = true;
          console.error('Error:', error); // Handle error
        }
      );
  }
  onCheckboxChange(event) {
    this.emailForm.patchValue({ isIndividual: event.target.checked });
  }
}
