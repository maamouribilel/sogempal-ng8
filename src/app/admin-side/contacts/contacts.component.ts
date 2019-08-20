import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  userData: any;
  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) {
    if (this.authService.isAdmin() && this.authService.isLoggedIn()) {
      this.userData = JSON.parse(localStorage.getItem('userData'));
      console.log('mrigel');
    } else {
      console.log('mouch mrigel');
    }
  }
  ngOnInit() {}
}
