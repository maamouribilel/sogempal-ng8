import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderList: any[] = [];
  totalPrice = 0;
  adress = {
    adresse: '',
    ville: '',
    postal: 0
  };

  constructor(private router: Router) {}

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('userAdress')) != null) {
      console.log(JSON.parse(localStorage.getItem('userAdress')));
      this.adress = JSON.parse(localStorage.getItem('userAdress'));
    }
    this.orderList = JSON.parse(localStorage.getItem('orderList'));
    this.totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    //  localStorage.setItem('slProducts', JSON.stringify(this.slProducts));
    if (this.totalPrice === 0) {
      this.router.navigate(['panier']);
    }
  }
  onSubmit(form: NgForm) {
    this.adress.adresse = form.value.adresse;
    this.adress.ville = form.value.ville;
    this.adress.postal = form.value.postal;
    localStorage.setItem('userAdress', JSON.stringify(this.adress));
    console.log(JSON.stringify(this.adress));
    this.router.navigate(['/order2']);
  }
}
