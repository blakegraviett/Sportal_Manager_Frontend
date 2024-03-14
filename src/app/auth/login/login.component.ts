import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoading: boolean = false;
  isLogged: boolean = false;
  isFailed: boolean = false;
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
    this.isLoading = true;
    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (response) => {
          // Handle successful login
          this.isLoading = false;
          this.isLogged = true;
          this.isFailed = false;
          this.authService.isLogged.next(true);
          console.log('response:', response);
        },
        (error) => {
          // Handle login error
          this.isLoading = false;
          this.isLogged = false;
          this.isFailed = true;
          console.error('Login error', error);
        }
      );
  }
}
