import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orders: any[] = [];
  ordersSubscription: Subscription;
  userSubscription: Subscription;
  user1Subscription: Subscription;
  loggedUser: any;
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    // get user info

    this.user1Subscription = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userSubscription = this.afs
          .doc('users/' + user.uid)
          .valueChanges()
          .subscribe(item => {
            this.loggedUser = item;
            this.getData(this.loggedUser);
          });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {}

  getData(user) {
    this.ordersSubscription = this.firestore
      .collection('orders', ref => ref.where('tel', '==', user.tel))
      .snapshotChanges()
      .subscribe(res => {
        this.orders = res.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          };
        });
      });
  }

  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.user1Subscription.unsubscribe();
  }
}
