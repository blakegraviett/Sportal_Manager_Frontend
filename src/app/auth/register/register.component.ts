import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}
  orgs: Array<any>;
  isLoading: boolean = false;
  isRegiestered: boolean = false;
  ngOnInit() {
    this.getAllOrgs();
  }

  // Register FORM
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    name: new FormControl('', [Validators.required]),
    org: new FormControl('', [Validators.required]),
  });

  // SUBMIT Register FORM
  onSubmit() {
    this.isLoading = true;
    // register the user
    this.authService
      .registerUser(
        this.registerForm.value.name,
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.org
      )
      .subscribe(
        (response) => {
          // Handle successful registration
          this.isRegiestered = true;
          this.isLoading = false;
        },
        (error) => {
          // Handle registration error
          console.error('Registration error', error);
        }
      );
  }

  getAllOrgs() {
    this.authService.getAllOrgs().subscribe(
      (response) => {
        // Handle successful login
        this.orgs = response.data;
      },
      (error) => {
        // Handle login error
        console.error('Login error', error);
      }
    );
  }
}
