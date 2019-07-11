import { Injectable, NgZone, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthService implements OnInit {
  loggedUser: any;
  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    public ngZone: NgZone
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.afs
          .doc('users/' + user.uid)
          .valueChanges()
          .subscribe(res => {
            this.loggedUser = res;
          });
        //   localStorage.setItem('user', JSON.stringify(this.loggedUser));
        //   JSON.parse(localStorage.getItem('user'));
      } else {
        //   localStorage.setItem('user', null);
        //   JSON.parse(localStorage.getItem('user'));
        this.router.navigate(['login']);
      }
    });
  }

  // Sign up with email/password
  async SignUp(registerForm: FormGroup) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        registerForm.value.signUpEmail,
        registerForm.value.signUpPassword
      );
      this.afs
        .collection('users')
        .doc(result.user.uid)
        .set({
          name: registerForm.value.signUpName,
          tel: registerForm.value.signUpTel
        });
      this.toastr.success('You have been successfully signed up.', 'Sign Up!');
      this.router.navigate(['/login']);
    } catch (error) {
      this.toastr.error(error, 'Error!');
    }
  }

  // Sign in
  async SignIn(signInForm: FormGroup) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(
        signInForm.value.userEmail,
        signInForm.value.userPassword
      );
      this.afs
        .doc('users/' + result.user.uid)
        .valueChanges()
        .subscribe(res => {
          this.loggedUser = res;
        });
      this.toastr.success('You have been successfully signed in.', 'Sign in!');
      this.ngZone.run(() => {
        this.router.navigate(['']);
      });
    } catch (error) {
      this.toastr.error(error, 'Error!');
    }
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}
