import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning,
    private toastr: ToastrService
  ) {}

  // sign in
  // Sign in
  async SignIn(form: NgForm) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(
        form.value.email,
        form.value.password
      );
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
    } catch (error) {
      this.toastr.error('Veuillez entrer des informations valides.');
    }
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['/admin']);
    });
  }

  // isadmin
  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user != null && user.role === 'admin') {
      return true;
    } else {
      console.log(false);
      return false;
    }
  }
  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('userData'));
    return user !== null && user.emailVerified !== false ? true : false;
  }
}
