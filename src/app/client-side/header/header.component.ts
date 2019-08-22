import { Component, OnInit, DoCheck } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ClientAuthService } from '../services/client-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  slProducts: any[] = [];
  constructor(
    public afAuth: AngularFireAuth,
    public clientAuthService: ClientAuthService
  ) {}

  ngOnInit() {
    this.slProducts = JSON.parse(localStorage.getItem('slProducts')) || [];
  }

  ngDoCheck() {
    this.slProducts = JSON.parse(localStorage.getItem('slProducts')) || [];
  }

  onLogout() {
    this.clientAuthService.logout();
  }
}
