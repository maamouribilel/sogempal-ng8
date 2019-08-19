import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from 'src/app/admin-side/sign-in/sign-in.component';

import { DashboardComponent } from 'src/app/admin-side/dashboard/dashboard.component';
import { ForgotPasswordComponent } from 'src/app/admin-side/forgot-password/forgot-password.component';

@NgModule({
  declarations: [SignInComponent, DashboardComponent, ForgotPasswordComponent],
  imports: [CommonModule, DashboardRoutingModule, FormsModule]
})
export class LazyDashboardModule {}
