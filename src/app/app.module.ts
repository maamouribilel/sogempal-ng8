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
    CaissesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    // include firebase config & modules
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // imports firebase/app needed for everything
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule
  ],
  providers: [AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
