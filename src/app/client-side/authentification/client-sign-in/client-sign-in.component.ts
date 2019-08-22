import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
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
    this.clientAuthService.checkLogged();
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
    this.clientAuthService.SignUp(this.registerForm);
  }

  onSignIn() {
    this.clientAuthService.SignIn(this.signInForm);
  }
}
