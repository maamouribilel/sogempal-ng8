import { Component, OnInit } from '@angular/core';
import { ClientAuthService } from '../services/client-auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  loggedUser: any;
  updateInfoForm: FormGroup;
  confirmPass: boolean;
  constructor(
    private clientAuthService: ClientAuthService,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private dataService: DataService
  ) {
    this.clientAuthService.checkNotLogged();
    this.updateInfoForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      telNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8)
      ])
    });
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.afs
          .doc('users/' + user.uid)
          .snapshotChanges()
          .subscribe(item => {
            this.loggedUser = {
              id: item.payload.id,
              ...item.payload.data()
            };
            this.updateInfoForm.get('firstname').setValue(this.loggedUser.name);
            this.updateInfoForm.get('telNumber').setValue(this.loggedUser.tel);
          });
      } else {
        this.router.navigate(['login']);
      }
    });
  }
  onUpdateInfo() {
    const newUser: any = {
      name: this.updateInfoForm.get('firstname').value,
      tel: this.updateInfoForm.get('telNumber').value
    };
    this.dataService.updateUserInfo(this.loggedUser, newUser);
  }
  /*
  checkPasswords() {
    const pass = this.updateInfoForm.get('newPassword').value;
    const confirmPass = this.updateInfoForm.get('confirmPassword').value;

    if (pass === confirmPass) {
      this.confirmPass = true;
    } else {
      this.confirmPass = false;
    }
  }
  */
}
