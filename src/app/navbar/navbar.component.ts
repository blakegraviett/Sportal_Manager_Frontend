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
        this.authService.getCurrentUser();
        if (!JSON.parse(this.authService.getCurrentUser()).role) {
          this.checkAdmin(
            JSON.parse(this.authService.getCurrentUser()).user.role
          );
        }
        if (JSON.parse(this.authService.getCurrentUser()).role) {
          this.checkAdmin(JSON.parse(this.authService.getCurrentUser()).role);
        }
      }
    });
  }
  // helper function to check if the user is an admin
  checkAdmin(role) {
    if (role === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
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
