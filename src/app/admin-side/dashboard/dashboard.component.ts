import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any;
  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) {
    /*
    if (this.authService.isAdmin() && this.authService.isLoggedIn()) {
      this.userData = JSON.parse(localStorage.getItem('userData'));
    } else {
      this.router.navigate(['/admin']);
    }
    */
  }


  ngOnInit() {}
}
