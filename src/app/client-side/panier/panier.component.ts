import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { ClientAuthService } from '../services/client-auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit, OnDestroy {
  shopList: any[];
  totalPrice = 0;

  constructor(
    private dataService: DataService,
    public afAuth: AngularFireAuth,
    private clientAuthService: ClientAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.shopList = JSON.parse(localStorage.getItem('slProducts')) || [];
    this.getTotal();
  }

  ngOnDestroy() {
    localStorage.setItem('orderList', JSON.stringify(this.shopList));
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
  }

  onRemoveSlProduct(index: number) {
    this.dataService.removeProductFromSl(index);
    this.shopList = JSON.parse(localStorage.getItem('slProducts'));
    this.totalPrice = 0;
    this.getTotal();
  }

  updateCart(i: number, quantity: number) {
    this.shopList[i].quantity = quantity;
    this.totalPrice = 0;
    this.getTotal();
    localStorage.setItem('slProducts', JSON.stringify(this.shopList));
  }

  getTotal(): number {
    this.shopList.forEach(product => {
      this.totalPrice = this.totalPrice + product.price * product.quantity;
    });
    return this.totalPrice;
  }

  onCheckout() {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
        this.router.navigate(['/order']);
      } else {
        console.log('user not logged in');
        this.router.navigate(['/login']);
      }
    });
  }
}
