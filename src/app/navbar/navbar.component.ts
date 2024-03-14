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
    if (JSON.parse(this.authService.getCurrentUser()).role === 'admin') {
      this.isAdmin = true;
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
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
  checkAdmin(role) {
    if (role === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
  ngOnDestroy() {}

  logout() {
    this.authService.logoutUser().subscribe(
      (response) => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('lastStoredTime');
        this.isLoggedOut = true;
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
