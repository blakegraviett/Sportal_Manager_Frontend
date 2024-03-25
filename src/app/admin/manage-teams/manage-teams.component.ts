import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-teams',
  templateUrl: './manage-teams.component.html',
  styleUrl: './manage-teams.component.scss',
})
export class ManageTeamsComponent {
  allTeams: Array<any>;
  isLoading: Boolean = false;
  logo;
  constructor(private adminService: AdminService) {}
  ngOnInit() {
    this.adminService.getAllTeams().subscribe(
      (response) => {
        this.allTeams = response.data;
      },
      (error) => {
        console.error('Error:', error); // Handle error
      }
    );
  }

  createTeamForm = new FormGroup({
    teamName: new FormControl('', Validators.required),
    teamLogo: new FormControl(null, Validators.required),
  });
  async onSubmit() {
    this.isLoading = true;
    this.adminService.uploadImage(this.logo).subscribe(
      (response) => {
        const teamLogo = response.data.src;
        console.log(response);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error:', error); // Handle error
        this.isLoading = false;
      }
    );
  }

  onDelete(id) {
    this.adminService.deleteTeam(id).subscribe(
      (response) => {
        location.reload();
      },
      (error) => {
        console.error('Error:', error); // Handle error
      }
    );
  }
}
