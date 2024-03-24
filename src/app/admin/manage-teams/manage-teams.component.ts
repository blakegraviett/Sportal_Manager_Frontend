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
    teamLogo: new FormControl('', Validators.required),
  });
  async onSubmit() {
    this.isLoading = true;
    this.adminService.uploadImage(this.createTeamForm.value.teamLogo).subscribe(
      (response) => {
        const teamLogo = response.data.src;
        console.log(response);
      },
      (error) => {
        console.error('Error:', error); // Handle error
      }
    );
  }
}
