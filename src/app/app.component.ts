import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  currentUser: any;
  ngOnInit() {
    this.currentUser = JSON.parse(this.authService.getCurrentUser());
    this.authService.clearLocalStorageAfterDuration();
  }
}
