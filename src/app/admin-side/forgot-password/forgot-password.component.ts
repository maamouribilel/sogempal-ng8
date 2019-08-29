import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}
  async onForgotPassword(email) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(email);
      this.toastr.success(
        'Email de réinitialisation du mot de passe envoyé, vérifiez votre boîte de réception.'
      );
    } catch (error) {
      this.toastr.error(
        `
Il n'y a pas d'enregistrement d'utilisateur correspondant à cet identifiant. L'utilisateur peut avoir été supprimé.`
      );
    }
  }
}
