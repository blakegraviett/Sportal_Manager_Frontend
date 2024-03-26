import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  isLoggedOut: Boolean = false;
  isAdmin: Boolean = false;
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.authService.getUserProfile().subscribe(
          (response) => {
            if (
              response.data.role === 'admin' ||
              response.data.role === 'owner'
            ) {
              this.isAdmin = true;
            }
          },
          (error) => {
            console.error('Error:', error); // Handle error
          }
        );
      }
    });
  }
  ngOnDestroy() {}

  // Logout the user and clear the local storage of data
  logout() {
    this.authService.logoutUser().subscribe(
      (response) => {
        // Sets a default to local storage
        const currentUser = JSON.stringify({ role: 'logedOut' });
        localStorage.setItem('currentUser', currentUser),
          localStorage.setItem('lastStoredTime', ''),
          (this.isLoggedOut = true);
        // shows successful logout message
        setTimeout(() => {
          this.isLoggedOut = false;
        }, 5000); //
        this.isAdmin = false;
      },
      (error) => {
        // Handle login error
        console.error('Login error', error);
      }
    );
  }
}
