import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrl: './admin-board.component.scss',
})
export class AdminBoardComponent {
  constructor(private authService: AuthService) {}
  currentUserName: String;
  isAdmin: Boolean = false;
  ngOnInit() {
    if (!JSON.parse(this.authService.getCurrentUser()).role) {
      this.checkAdmin(JSON.parse(this.authService.getCurrentUser()).user.role);
    }
    if (JSON.parse(this.authService.getCurrentUser()).role) {
      this.checkAdmin(JSON.parse(this.authService.getCurrentUser()).role);
    }
    if (JSON.parse(this.authService.getCurrentUser()).name) {
      this.currentUserName = JSON.parse(this.authService.getCurrentUser()).name;
    }
    if (!JSON.parse(this.authService.getCurrentUser()).name) {
      this.currentUserName = JSON.parse(
        this.authService.getCurrentUser()
      ).user.name;
    }
  }

  checkAdmin(role) {
    if (role === 'admin' || role === 'owner') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
