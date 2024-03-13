import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  // LOGIN FORM
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  // SUBMIT LOGIN FORM
  onSubmit() {
    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (response) => {
          // Handle successful login
          console.log('Login successful', response);
        },
        (error) => {
          // Handle login error
          console.error('Login error', error);
        }
      );
  }
}
