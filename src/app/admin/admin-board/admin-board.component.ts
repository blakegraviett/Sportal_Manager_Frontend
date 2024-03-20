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
    this.authService.getUserProfile().subscribe(
      (response) => {
        if (response.data.role === 'admin' || response.data.role === 'owner') {
          this.isAdmin = true;
        }
        this.currentUserName = response.data.name;
      },
      (error) => {
        console.error('Error:', error); // Handle error
      }
    );
  }
}
