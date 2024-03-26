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
    teamLogo: new FormControl(),
  });
  async onSubmit() {
    this.isLoading = true;
    this.adminService.uploadImage(this.logo).subscribe(
      (response) => {
        // TODO: Once the logo is uploaded, create the new team with the image being the cloudinary url
        const teamLogo = response.data.src;
        console.log(teamLogo);

        this.adminService
          .createTeam(this.createTeamForm.value.teamName, teamLogo)
          .subscribe(
            (response) => {
              this.isLoading = false;
              location.reload();
            },
            (error) => {
              this.isLoading = false;
              console.error('Error:', error); // Handle error
            }
          );
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
  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.logo = file;
    }
  }
}
