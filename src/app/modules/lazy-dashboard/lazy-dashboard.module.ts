import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from 'src/app/admin-side/sign-in/sign-in.component';

import { DashboardComponent } from 'src/app/admin-side/dashboard/dashboard.component';
import { ForgotPasswordComponent } from 'src/app/admin-side/forgot-password/forgot-password.component';
import { ProductsComponent } from 'src/app/admin-side/products/products.component';
import { OrdersComponent } from 'src/app/admin-side/orders/orders.component';
import { UsersComponent } from 'src/app/admin-side/users/users.component';
import { ContactsComponent } from 'src/app/admin-side/contacts/contacts.component';
import { DataTablesModule } from 'angular-datatables';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DashHeaderComponent } from 'src/app/admin-side/dash-header/dash-header.component';

// chart js
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    SignInComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ProductsComponent,
    OrdersComponent,
    UsersComponent,
    ContactsComponent,
    DashHeaderComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ChartsModule,
    AngularEditorModule
  ]
})
export class LazyDashboardModule {}
