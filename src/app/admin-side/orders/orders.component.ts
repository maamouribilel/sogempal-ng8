import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { BackDataService } from '../shared/services/back-data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  userData: any;
  orders: any[] = [];
  ordersSubscription: Subscription;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    private backDataService: BackDataService
  ) {
    if (this.authService.isAdmin() && this.authService.isLoggedIn()) {
      this.userData = JSON.parse(localStorage.getItem('userData'));
      console.log('mrigel');
    } else {
      console.log('mouch mrigel');
    }
    // get products
    this.ordersSubscription = this.backDataService
      .getOrders()
      .subscribe(res => {
        console.log(res);
        this.orders = res.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          };
        });
        this.dtTrigger.next();
      });
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4,
      lengthMenu: [4, 8, 15, 20],
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
      }
    };
  }

  // delete product
  onDeleteProd(prodId: string) {
    if (confirm('Are you sure?')) {
      this.backDataService.deleteProduct(prodId);
      this.dtTrigger.next();
    }
  }
  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
  }
}
