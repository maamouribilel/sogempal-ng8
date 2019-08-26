import { Component, OnInit, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { BackDataService } from '../shared/services/back-data.service';
import { FormControl } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  userData: any;
  orders: any[] = [];
  ordersSubscription: Subscription;
  etatInput = new FormControl();
  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    private backDataService: BackDataService
  ) {
    /*
    if (this.authService.isAdmin() && this.authService.isLoggedIn()) {
      this.userData = JSON.parse(localStorage.getItem('userData'));
    } else {
      this.router.navigate(['/admin']);
    }
    */
    // get orders
    this.ordersSubscription = this.backDataService
      .getOrders()
      .subscribe(res => {
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

  // delete order
  onDeleteOrder(orderId: string) {
    if (confirm('Est-ce que vous êtes sûre?')) {
      this.backDataService.deleteOrder(orderId);
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    }
  }
  // update order
  onUpdateOrder(order) {
    const newOrder: any = {
      etatCommande: this.etatInput.value
    };
    this.backDataService.updateOrder(order, newOrder);
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }
  //
  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
}
