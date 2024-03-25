import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-workers',
  templateUrl: './manage-workers.component.html',
  styleUrl: './manage-workers.component.scss',
})
export class ManageWorkersComponent {
  // email form
  emailForm = new FormGroup({
    event: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required]),
    body: new FormGroup('', [Validators.required]),
  });
}
