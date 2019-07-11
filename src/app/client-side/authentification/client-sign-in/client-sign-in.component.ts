import { Component, OnInit, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ClientAuthService } from '../../services/client-auth.service';

@Component({
  selector: 'app-client-sign-in',
  templateUrl: './client-sign-in.component.html',
  styleUrls: ['./client-sign-in.component.css']
})
export class ClientSignInComponent implements OnInit {
  registerForm: FormGroup;
  signInForm: FormGroup;

  constructor(private clientAuthService: ClientAuthService) {
    this.registerForm = new FormGroup({
      signUpName: new FormControl(null, [Validators.required]),
      signUpEmail: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      signUpPassword: new FormControl(null, [Validators.required]),
      signUpTel: new FormControl(null, [Validators.required])
    });

    this.signInForm = new FormGroup({
      userEmail: new FormControl(null, [Validators.required, Validators.email]),
      userPassword: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {}

  onSignUp() {
    console.log(this.registerForm);
    this.clientAuthService.SignUp(this.registerForm);
  }

  onSignIn() {
    console.log(this.signInForm);
    this.clientAuthService.SignIn(this.signInForm);
  }
}
