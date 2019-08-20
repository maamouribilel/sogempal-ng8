import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//  dashboard components
import { SignInComponent } from 'src/app/admin-side/sign-in/sign-in.component';
import { DashboardComponent } from 'src/app/admin-side/dashboard/dashboard.component';
import { ForgotPasswordComponent } from 'src/app/admin-side/forgot-password/forgot-password.component';
import { ProductsComponent } from 'src/app/admin-side/products/products.component';
import { OrdersComponent } from 'src/app/admin-side/orders/orders.component';
import { UsersComponent } from 'src/app/admin-side/users/users.component';
import { ContactsComponent } from 'src/app/admin-side/contacts/contacts.component';

// dashboard guards

const dashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent
    // canActivate: [SecureInnerPagesGuard]
  },

  {
    path: 'dashboard',
    component: DashboardComponent
    // canActivate: [AuthGuard]
  },
  {
    path: 'products',
    component: ProductsComponent
    // canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    component: OrdersComponent
    // canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent
    // canActivate: [AuthGuard]
  },
  {
    path: 'contacts',
    component: ContactsComponent
    // canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
    // canActivate: [SecureInnerPagesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
