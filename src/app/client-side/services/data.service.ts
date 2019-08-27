import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
// import { Product } from './product';

@Injectable()
export class DataService {
  // products: Product[] = [];
  products: any[] = [];
  slProducts: any[] = [];

  constructor(
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  // products data
  getProducts(): Observable<any[]> {
    return this.firestore
      .collection<any[]>('products', ref =>
        ref.where('category', '==', 'palettes')
      )
      .valueChanges();
  }
  // products data
  getPalettes(): Observable<any[]> {
    return this.firestore
      .collection<any[]>('products', ref =>
        ref.where('category', '==', 'palettes')
      )
      .valueChanges();
  }
  // products data
  getCaisses(): Observable<any[]> {
    return this.firestore
      .collection<any[]>('products', ref =>
        ref.where('category', '==', 'caisses')
      )
      .valueChanges();
  }

  // Shopping list data
  getSlProducts() {
    this.slProducts = JSON.parse(localStorage.getItem('slProducts')) || [];
    return this.slProducts;
  }

  // shopping list data actions
  addToSl(prod: any) {
    // send quantity and compare it
    const res = this.slProducts.indexOf(prod);
    if (res === -1) {
      prod.quantity = 1;
      this.slProducts.push(prod);
      localStorage.setItem('slProducts', JSON.stringify(this.slProducts));
      this.toastr.success('Produit ajouté!');
    } else {
      this.slProducts[res].quantity += 1;
      this.toastr.success('Produit ajouté!');
      localStorage.setItem('slProducts', JSON.stringify(this.slProducts));
    }
  }

  removeProductFromSl(index: number) {
    this.slProducts.splice(index, 1);
    localStorage.setItem('slProducts', JSON.stringify(this.slProducts));
  }

  saveOrder() {
    const order = JSON.parse(localStorage.getItem('orderDetails'));
    this.firestore.collection('orders').add(order);
  }

  /********************************************** update user */
  updateUserInfo(user, newUser) {
    this.firestore.doc('users/' + user.id).update(newUser);
    this.toastr.success('Vos informations ont été mises à jour');
  }

  /*************************************************my orders */
  /*
  getOrders(telNumber): Observable<any[]> {
    return this.firestore
      .collection('orders', ref => ref.where('tel', '==', telNumber))
      .snapshotChanges();
  }
  */

  /************************* Client contact */
  saveContact(contact) {
    this.firestore.collection('contacts').add(contact);
    this.toastr.success('Votre message a été envoyé avec succès!');
  }
}
