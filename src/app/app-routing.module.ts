import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { ViewEventsComponent } from './events/view-events/view-events.component';
import { AdminBoardComponent } from './admin/admin-board/admin-board.component';
import { ManageEventsComponent } from './admin/manage-events/manage-events.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: LandingPageComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
  },
  {
    path: 'user/verify-email',
    component: VerifyEmailComponent,
  },
  {
    path: 'events/view',
    component: ViewEventsComponent,
  },
  {
    path: 'admin-panel',
    component: AdminBoardComponent,
    children: [
      { path: '', redirectTo: 'manage-events', pathMatch: 'full' },
      // { path: 'create-events', component: CreateEventsComponent },
      { path: 'manage-events', component: ManageEventsComponent },
      // { path: 'update-scores', component: UpdateScoresComponent },
      // { path: 'manage-teams', component: ManageTeamsComponent },
      // { path: 'manage-admins', component: ManageAdminsComponent },
      // { path: 'manage-workers', component: ManageWorkersComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
