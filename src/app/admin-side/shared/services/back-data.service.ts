import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackDataService {
  products: any[] = [];
  constructor(private http: HttpClient, private firestore: AngularFirestore) {}
  // products data
  getProducts(): Observable<any[]> {
    return this.firestore.collection<any[]>('products').valueChanges();
  }
}
