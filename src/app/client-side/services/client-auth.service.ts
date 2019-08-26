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
      } else {
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
      const myDate = new Date();
      const date = myDate.getDate();
      const month = myDate.getMonth();
      const year = myDate.getFullYear();
      const dateString = date + '-' + (month + 1) + '-' + year;
      this.afs
        .collection('users')
        .doc(result.user.uid)
        .set({
          name: registerForm.value.signUpName,
          tel: registerForm.value.signUpTel,
          role: 'client',
          block: false,
          inscriptionDate: dateString
        });
      this.toastr.success('Vous avez été inscrit avec succès.', 'Yayy!');
      this.router.navigate(['/']);
    } catch (error) {
      this.toastr.error(
        `veuillez vérifier vos saisies s'il vous plait`,
        'Awww!'
      );
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
          if (this.loggedUser.block == 'true') {
            this.toastr.error(`Désolé votre compte a été bloqué! `);
            this.afAuth.auth.signOut();
          } else {
            this.toastr.success('Vous avez été connecté avec succès.', 'Yayy!');
            this.ngZone.run(() => {
              this.router.navigate(['']);
            });
          }
        });
    } catch (error) {
      this.toastr.error(
        `veuillez vérifier vos saisies s'il vous plait`,
        'Awww!'
      );
    }
  }

  checkLogged() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }
  checkNotLogged() {
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.router.navigate(['/']);
      }
    });
  }
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
  getUser() {
    return this.loggedUser;
  }
}
