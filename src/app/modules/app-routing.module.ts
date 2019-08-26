import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// client
import { HomeComponent } from '../client-side/home/home.component';
import { ContactComponent } from '../client-side/contact/contact.component';
import { ClientSignInComponent } from '../client-side/authentification/client-sign-in/client-sign-in.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { PalettesComponent } from '../client-side/palettes/palettes.component';
import { CaissesComponent } from '../client-side/caisses/caisses.component';
import { PanierComponent } from '../client-side/panier/panier.component';
import { OrderComponent } from '../client-side/order/order.component';
import { Order2Component } from '../client-side/order2/order2.component';
import { Order3Component } from '../client-side/order3/order3.component';
import { MyAccountComponent } from '../client-side/my-account/my-account.component';
import { MyOrdersComponent } from '../client-side/my-orders/my-orders.component';

// admin
/*
import { SignInComponent } from './admin-side/sign-in/sign-in.component';
import { SignUpComponent } from './admin-side//sign-up/sign-up.component';
import { DashboardComponent } from './admin-side/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './admin-side//forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './admin-side/verify-email/verify-email.component';
*/
// Import canActivate guard services
/*
import { AuthGuard } from './admin-side/shared/guard/auth.guard';
import { SecureInnerPagesGuard } from './admin-side/shared/guard/secure-inner-pages.guard';
*/
const routes: Routes = [
  { path: 'accueil', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: ClientSignInComponent },
  { path: 'palettes', component: PalettesComponent },
  { path: 'caisses', component: CaissesComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'mon-compte', component: MyAccountComponent },
  { path: 'mes-commandes', component: MyOrdersComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order2', component: Order2Component },
  { path: 'order3', component: Order3Component },
  { path: 'not-found', component: NotFoundComponent },

  /*
  { path: 'dashboard', redirectTo: '/sign-in', pathMatch: 'full' },
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
  },
*/
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./lazy-dashboard/lazy-dashboard.module').then(
        m => m.LazyDashboardModule
      )
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
