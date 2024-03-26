import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrl: './manage-admins.component.scss',
})
export class ManageAdminsComponent {
  isOwner: boolean = false;
  allUsers;
  constructor(
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    // Check to see if the user is an ownser
    this.authService.getUserProfile().subscribe(
      (response) => {
        console.log(response);

        if (response.data.role === 'owner') {
          this.isOwner = true;
          this.adminService.getAllUsers().subscribe(
            (response) => {
              console.log(response.data);

              this.allUsers = response.data.users;
            },
            (error) => {
              console.error('Error:', error); // Handle error
            }
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  promote(id) {
    this.adminService.promoteUser(id).subscribe(
      (response) => {
        location.reload();
      },
      (error) => {
        console.error('Error:', error); // Handle error
      }
    );
  }

  demote(id) {
    this.adminService.demoteUser(id).subscribe(
      (response) => {
        location.reload();
      },
      (error) => {
        console.error('Error:', error); // Handle error
      }
    );
  }
}
