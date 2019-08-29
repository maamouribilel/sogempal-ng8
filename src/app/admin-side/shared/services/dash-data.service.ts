import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashDataService {
  constructor(private firestore: AngularFirestore) {}

  getProducts(): Observable<any[]> {
    return this.firestore.collection('products').valueChanges();
  }

  getOrders(): Observable<any[]> {
    return this.firestore.collection('orders').valueChanges();
  }

  getContacts(): Observable<any[]> {
    return this.firestore.collection('contacts').valueChanges();
  }

  getUsers(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }
}
