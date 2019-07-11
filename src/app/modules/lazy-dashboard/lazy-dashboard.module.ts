import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SignInComponent } from 'src/app/admin-side/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/admin-side/sign-up/sign-up.component';
import { DashboardComponent } from 'src/app/admin-side/dashboard/dashboard.component';
import { ForgotPasswordComponent } from 'src/app/admin-side/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from 'src/app/admin-side/verify-email/verify-email.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [CommonModule, DashboardRoutingModule]
})
export class LazyDashboardModule {}
