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
    return this.firestore.collection('orders').snapshotChanges();
  }
  // updae order
  updateOrder(order, newOrder) {
    const id = order.id;
    console.log(id);
    console.log(newOrder);

    this.firestore.doc('orders/' + id).update(newOrder);
    this.toastr.success('La commande a été mise à jour avec success!');
  }
  deleteOrder(orderId: string) {
    this.firestore.doc('orders/' + orderId).delete();
    this.toastr.success('Le commande à été suppriméz avec succès!');
  }

  // ******************** */ USERS *************************//
  // *******************************************************//
  getUsers(): Observable<any[]> {
    return this.firestore.collection('users').snapshotChanges();
  }
  // updae user
  updateUser(user, newUser) {
    const id = user.id;
    this.firestore.doc('users/' + id).update(newUser);
    this.toastr.success(`l'opération a bien ete effectuée!`);
  }

  getBlock(user) {
    return this.firestore.doc('users/' + user.id).valueChanges();
  }

  // ******************** */ CONTACTS *************************//
  // *******************************************************//

  getContacts(): Observable<any[]> {
    return this.firestore
      .collection('contacts', ref => ref.orderBy('sentDate', 'desc'))
      .snapshotChanges();
  }

  updateContact(contact, newContact) {
    const id = contact.id;
    this.firestore.doc('contacts/' + id).update(newContact);
  }

  // *********************** ********************************/
  getUnreadMsgs(): Observable<any[]> {
    return this.firestore
      .collection('contacts', ref => ref.where('msgState', '==', 'unread'))
      .snapshotChanges();
  }
}
