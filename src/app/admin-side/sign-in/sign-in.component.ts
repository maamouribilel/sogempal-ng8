import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  userData: any;
  constructor(
    private authService: AuthService,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone,
    private toastr: ToastrService
  ) {
    // NgZone service to remove outside scope warning) {}
    if (this.authService.isAdmin() && this.authService.isLoggedIn()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }
  ngOnInit() {}

  onSignIn(form: NgForm) {
    console.log(form);
    this.authService.SignIn(form);
  }
  // Sign in with Google
  onGoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        this.afs
          .doc('users/' + result.user.uid)
          .valueChanges()
          .subscribe(res => {
            this.userData = res;

            if (this.userData.role === 'admin' && this.userData.role != null) {
              localStorage.setItem('userData', JSON.stringify(this.userData));
              this.toastr.success(
                'You have been successfully signed in.',
                'Sign in!'
              );
              this.ngZone.run(() => {
                this.router.navigate(['admin/dashboard']);
              });
            } else {
              this.afAuth.auth.signOut();
              this.toastr.error('Veuillez entrer des informations valides.');
              this.ngZone.run(() => {
                this.router.navigate(['']);
              });
            }
          });
      })
      .catch(error => {
        this.toastr.error('Veuillez entrer des informations valides.');
      });
  }
}
