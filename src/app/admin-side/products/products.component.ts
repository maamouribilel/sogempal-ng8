import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { BackDataService } from '../shared/services/back-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  userData: any;
  products: any[] = [];
  productsSubscription: Subscription;
  constructor(
    public authService: AuthService,
    private backDataService: BackDataService
  ) {
    // check if logged
    if (this.authService.isAdmin() && this.authService.isLoggedIn()) {
      this.userData = JSON.parse(localStorage.getItem('userData'));
      console.log('mrigel');
    } else {
      console.log('mouch mrigel');
    }
    // get products
    this.productsSubscription = this.backDataService
      .getProducts()
      .subscribe(res => {
        this.products = res;
      });
  }

  ngOnInit() {}
  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
