import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BackDataService {
  products: any[] = [];
  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}
  // get products data
  getProducts(): Observable<any[]> {
    return this.firestore.collection<any[]>('products').valueChanges();
  }
  // add product
  addProduct(newProd: any) {
    this.firestore.collection('products').add(newProd);
    this.toastr.success('Le produit & été ajouté avec success!');
  }
}
