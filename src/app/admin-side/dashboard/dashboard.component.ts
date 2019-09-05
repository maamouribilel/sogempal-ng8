import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { DashDataService } from '../shared/services/dash-data.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

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

  /* charts js area Begin */
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public chartColors: any[] = [
    {
      backgroundColor: '#A77847',
      borderColor: '#A77847',
      pointBackgroundColor: '#A77847',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#A77847'
    }
  ];
  public tenDays = [];
  public tenDaysSells = [];
  public barChartType = 'line';
  public barChartLegend = true;

  public barChartData = [
    { data: this.tenDaysSells, label: 'Nombre de ventes / jour' }
  ];

  /* charts js area END */

  constructor(
    private dashDataService: DashDataService,
    public router: Router,
    private firestore: AngularFirestore
  ) {
    this.getProducts();
    this.getOrders();
    this.getContacts();
    this.getUsers();
    this.calculBenefits();
    this.completedOrders();
    this.calculateDays();
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

  /* charts js area Begin */

  calculateDays() {
    const allMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    const year = today.getFullYear();

    for (let i = 0; i < 10; i++) {
      if (day > 1) {
        this.tenDays.push(day + '-' + month + '-' + year);
        this.firestore
          .collection<any[]>('orders', ref =>
            ref.where('date', '==', day + '-' + month + '-' + year)
          )
          .valueChanges()
          .subscribe(data => {
            if (data != null) {
              this.tenDaysSells[i] = data.length;
            } else {
              this.tenDaysSells[i] = 0;
            }
          });
        day--;
      } else if (day === 1 && month !== 1) {
        this.tenDays.push(day + '-' + month + '-' + year);
        this.firestore
          .collection<any[]>('orders', ref =>
            ref.where('date', '==', day + '-' + month + '-' + year)
          )
          .valueChanges()
          .subscribe(data => {
            if (data != null) {
              this.tenDaysSells[i] = data.length;
            } else {
              this.tenDaysSells[i] = 0;
            }
          });
        month--;
        day = allMonths[month - 1];
      }
    }
    console.log(this.tenDays);
  }

  /* charts js area END */
}
