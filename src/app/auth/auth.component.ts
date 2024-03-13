import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  isLoginFormSub: Subscription;
  isLoginForm: Boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoginFormSub = this.authService.isLoginForm.subscribe(
      (data) => (this.isLoginForm = data)
    );
    console.log('isLoginForm:', this.isLoginForm);
  }
  ngOnDestroy() {
    this.isLoginFormSub.unsubscribe();
  }
}
