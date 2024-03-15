import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent {
  routeSubscription: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // get the params and send the information to the backend to verify the email
    this.routeSubscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        const email = params['email'];
        const token = params['token'];

        this.verifyEmail(email, token);
      }
    );
  }
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
  verifyEmail(email: string, token: string) {
    this.authService.verifyEmail(email, token).subscribe(
      (response) => {
        // Handle successful registration
      },
      (error) => {
        // Handle registration error
      }
    );
  }
}
