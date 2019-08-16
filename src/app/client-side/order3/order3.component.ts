import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order3',
  templateUrl: './order3.component.html',
  styleUrls: ['./order3.component.css']
})
export class Order3Component implements OnInit {
  orderDetails: any;
  constructor(private router: Router) {
    if (JSON.parse(localStorage.getItem('orderDetails')) != null) {
      this.orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
      console.log(this.orderDetails.date);
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {}
}
