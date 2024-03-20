import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../events/events.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoading: boolean = false;
  isLogged: boolean = false;
  isFailed: boolean = false;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService
  ) {}

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
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/events/view']);
            });
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
