import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { DashDataService } from '../shared/services/dash-data.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  products: any[] = [];
  orders: any[] = [];
  contacts: any[] = [];
  users: any[] = [];
  productsSubscription: Subscription;
  ordersSubscription: Subscription;
  contactsSubscription: Subscription;
  usersSubscription: Subscription;
  benefits = 0;
  finishedOrders = 0;
  constructor(private dashDataService: DashDataService, public router: Router) {
    this.getProducts();
    this.getOrders();
    this.getContacts();
    this.getUsers();
    this.calculBenefits();
    this.completedOrders();
  }

  ngOnInit() {}

  getProducts() {
    this.productsSubscription = this.dashDataService
      .getProducts()
      .subscribe(prods => {
        this.products = prods;
      });
  }
  getOrders() {
    this.ordersSubscription = this.dashDataService
      .getOrders()
      .subscribe(orders => {
        this.orders = orders;
      });
  }
  getContacts() {
    this.contactsSubscription = this.dashDataService
      .getContacts()
      .subscribe(contacts => {
        this.contacts = contacts;
      });
  }
  getUsers() {
    this.usersSubscription = this.dashDataService
      .getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }
  calculBenefits() {
    this.dashDataService.getOrders().subscribe(orders => {
      orders.map(order => {
        this.benefits += order.prixTotal;
      });
    });
  }
  completedOrders() {
    this.dashDataService.getOrders().subscribe(orders => {
      orders.map(order => {
        if (order.etatCommande == 'Livré') {
          this.finishedOrders += 1;
          console.log(this.finishedOrders);
        }
      });
    });
  }
  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
    this.ordersSubscription.unsubscribe();
    this.contactsSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }
}
