import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ClientAuthService } from '../services/client-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    private clientAuthService: ClientAuthService
  ) {}

  ngOnInit() {}

  onLogout() {
    this.clientAuthService.logout();
  }
}
