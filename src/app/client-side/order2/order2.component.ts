import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order2',
  templateUrl: './order2.component.html',
  styleUrls: ['./order2.component.css']
})
export class Order2Component implements OnInit {
  orderList: any[] = [];
  totalPrice = 0;
  adress: any;
  paymentInfo = {
    numCarte: 0,
    moisCarte: 0,
    anneeCarte: 0,
    cvvCarte: 0
  };
  paymentState = 0;
  orderDetails = {};
  constructor(private router: Router) {}

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('paymentInfo')) != null) {
      this.paymentInfo = JSON.parse(localStorage.getItem('paymentInfo'));
    }

    this.orderList = JSON.parse(localStorage.getItem('orderList'));
    this.totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    this.adress = JSON.parse(localStorage.getItem('userAdress'));

    if (this.totalPrice === 0) {
      this.router.navigate(['panier']);
    }
  }
  onSubmit(form: NgForm) {
    this.paymentInfo.numCarte = form.value.numCarte;
    this.paymentInfo.moisCarte = form.value.moisCarte;
    this.paymentInfo.anneeCarte = form.value.anneeCarte;
    this.paymentInfo.cvvCarte = form.value.cvvCarte;

    localStorage.setItem('paymentInfo', JSON.stringify(this.paymentInfo));
    console.log(JSON.stringify(this.paymentInfo));
    //  this.router.navigate(['/order2']);
    this.paymentState = 1;
    localStorage.setItem('paymentState', JSON.stringify(this.paymentState));
    console.log(JSON.stringify(this.paymentState));
    // this.router.navigate(['/order3']);
  }
}
