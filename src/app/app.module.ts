import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { ViewEventsComponent } from './events/view-events/view-events.component';
import { EventCardComponent } from './events/event-card/event-card.component';
import { AdminBoardComponent } from './admin/admin-board/admin-board.component';
import { ManageEventsComponent } from './admin/manage-events/manage-events.component';
import { CreateEventComponent } from './admin/create-event/create-event.component';
import { UpdateScoresComponent } from './admin/update-scores/update-scores.component';
import { ManageWorkersComponent } from './admin/manage-workers/manage-workers.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    ViewEventsComponent,
    EventCardComponent,
    AdminBoardComponent,
    ManageEventsComponent,
    CreateEventComponent,
    UpdateScoresComponent,
    ManageWorkersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
