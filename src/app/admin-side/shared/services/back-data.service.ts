import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BackDataService {
  products: any[] = [];
  orders: any[] = [];
  constructor(
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  // ******************** */ PRODUCTS *************************//
  // *******************************************************//

  // get products data
  getProducts(): Observable<any[]> {
    return this.firestore.collection('products').snapshotChanges();
  }
  // add product
  addProduct(newProd: any) {
    this.firestore.collection('products').add(newProd);
    this.toastr.success('Le produit a été ajouté avec success!');
  }
  // updae product
  updateProduct(newProd: any) {
    const id = newProd.hiddenId;
    delete newProd.hiddenId;
    this.firestore.doc('products/' + id).update(newProd);
    this.toastr.success('Le produit a été mis à jour avec success!');
  }
  // delete product
  deleteProduct(prodId: string) {
    this.firestore.doc('products/' + prodId).delete();
    this.toastr.success('Le produit à été supprimé avec succès!');
  }

  // ******************** */ ORDERS *************************//
  // *******************************************************//
  getOrders(): Observable<any[]> {
    return this.firestore.collection('oders').snapshotChanges();
  }
  deleteOrder(orderId: string) {
    this.firestore.doc('orders/' + orderId).delete();
    this.toastr.success('Le produit à été supprimé avec succès!');
  }
}
