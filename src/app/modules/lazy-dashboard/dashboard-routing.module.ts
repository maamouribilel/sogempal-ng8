import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//  dashboard components
import { SignInComponent } from 'src/app/admin-side/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/admin-side/sign-up/sign-up.component';
import { DashboardComponent } from 'src/app/admin-side/dashboard/dashboard.component';
import { ForgotPasswordComponent } from 'src/app/admin-side/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from 'src/app/admin-side/verify-email/verify-email.component';
// dashboard guards
import { AuthGuard } from 'src/app/admin-side/shared/guard/auth.guard';
import { SecureInnerPagesGuard } from 'src/app/admin-side/shared/guard/secure-inner-pages.guard';

const dashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'register-user',
    component: SignUpComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'verify-email-address',
    component: VerifyEmailComponent,
    canActivate: [SecureInnerPagesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
