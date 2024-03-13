import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // LOGIN FORM
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  // SUBMIT LOGIN FORM
  onSubmit() {
    console.log(this.loginForm.value);
  }
}
