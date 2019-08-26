import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// animations and toastr
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './client-side/header/header.component';
import { FooterComponent } from './client-side/footer/footer.component';
import { HomeComponent } from './client-side/home/home.component';
import { AboutUsComponent } from './client-side/about-us/about-us.component';
import { ContactComponent } from './client-side/contact/contact.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ClientSignInComponent } from './client-side/authentification/client-sign-in/client-sign-in.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { PanierComponent } from './client-side/panier/panier.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
// Firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Firebase config file
import { environment } from 'src/environments/environment';

// services
import { AuthService } from './admin-side/shared/services/auth.service';
import { DataService } from './client-side/services/data.service';
import { PalettesComponent } from './client-side/palettes/palettes.component';
import { CaissesComponent } from './client-side/caisses/caisses.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderComponent } from './client-side/order/order.component';
import { Order2Component } from './client-side/order2/order2.component';
import { Order3Component } from './client-side/order3/order3.component';
import { LazyDashboardModule } from './modules/lazy-dashboard/lazy-dashboard.module';
import { AddProductComponent } from './admin-side/products/add-product/add-product.component';
import { MyAccountComponent } from './client-side/my-account/my-account.component';
import { MyOrdersComponent } from './client-side/my-orders/my-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    ContactComponent,
    NotFoundComponent,
    ClientSignInComponent,
    SpinnerComponent,
    PanierComponent,
    PalettesComponent,
    CaissesComponent,
    OrderComponent,
    Order2Component,
    Order3Component,
    AddProductComponent,
    MyAccountComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularEditorModule,
    ToastrModule.forRoot(),
    // include firebase config & modules
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // imports firebase/app needed for everything
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    LazyDashboardModule
  ],
  providers: [AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
