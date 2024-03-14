import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}
  isLoggedOut: Boolean = false;
  ngOnInit() {}

  ngOnDestroy() {}

  logout() {
    this.authService.logoutUser().subscribe(
      (response) => {
        console.log('response:', response);
        this.isLoggedOut = true;
        setTimeout(() => {
          this.isLoggedOut = false;
        }, 5000); //
      },
      (error) => {
        // Handle login error
        console.error('Login error', error);
      }
    );
  }
}
