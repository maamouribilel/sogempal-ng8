import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-order2',
  templateUrl: './order2.component.html',
  styleUrls: ['./order2.component.css']
})
export class Order2Component implements OnInit {
  orderList: any[] = [];
  totalPrice = 0;
  adress: any;
  paymentInfo = {
    numCarte: 0,
    moisCarte: 0,
    anneeCarte: 0,
    cvvCarte: 0
  };
  paymentState = 0;
  nomComplet: '';
  tel: '';
  orderDetails = {
    nom: '',
    adresse: '',
    tel: '',
    date: new Date(),
    produits: [],
    prixTotal: 0,
    etatCommande: 0
  };
  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private dataService: DataService
  ) {}
  // this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  ngOnInit() {
    if (JSON.parse(localStorage.getItem('paymentInfo')) != null) {
      this.paymentInfo = JSON.parse(localStorage.getItem('paymentInfo'));
      console.log(this.orderDetails.date);
    }

    this.orderList = JSON.parse(localStorage.getItem('orderList'));
    this.totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    this.adress = JSON.parse(localStorage.getItem('userAdress'));

    if (this.totalPrice === 0) {
      this.router.navigate(['/panier']);
    }
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.afs
          .doc('users/' + user.uid)
          .valueChanges()
          .subscribe(res => {
            this.nomComplet = res['name'];
            this.tel = res['tel'];
            console.log(res);
            // console.log(this.nomComplet);
          });
        //   localStorage.setItem('user', JSON.stringify(this.loggedUser));
        //   JSON.parse(localStorage.getItem('user'));
      } else {
        //   localStorage.setItem('user', null);
        //   JSON.parse(localStorage.getItem('user'));
        this.router.navigate(['/accueil']);
      }
    });
  }
  onSubmit(form: NgForm) {
    this.paymentInfo.numCarte = form.value.numCarte;
    this.paymentInfo.moisCarte = form.value.moisCarte;
    this.paymentInfo.anneeCarte = form.value.anneeCarte;
    this.paymentInfo.cvvCarte = form.value.cvvCarte;

    localStorage.setItem('paymentInfo', JSON.stringify(this.paymentInfo));
    console.log(JSON.stringify(this.paymentInfo));
    //  this.router.navigate(['/order2']);
    this.paymentState = 1;
    localStorage.setItem('paymentState', JSON.stringify(this.paymentState));
    console.log(JSON.stringify(this.paymentState));
    // this.router.navigate(['/order3']);
    const myDate = new Date();
    this.orderDetails.nom = this.nomComplet;
    this.orderDetails.adresse = this.adress;
    this.orderDetails.tel = this.tel;
    this.orderDetails.date = myDate;
    this.orderDetails.produits = this.orderList;
    this.orderDetails.prixTotal = this.totalPrice;
    this.orderDetails.etatCommande = this.paymentState;
    console.log(this.orderDetails);
    localStorage.setItem('orderDetails', JSON.stringify(this.orderDetails));
    // this.dataService.saveOrder();
    localStorage.removeItem('slProducts');
    this.router.navigate(['/order3']);
  }
}
