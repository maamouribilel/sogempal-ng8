import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from '../services/data.service';
import { ClientAuthService } from '../services/client-auth.service';

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
    numCarte: null,
    moisCarte: null,
    anneeCarte: null,
    cvvCarte: null
  };
  paymentState = 0;
  nomComplet: '';
  tel: '';
  orderDetails = {
    nom: '',
    adresse: '',
    tel: '',
    date: '',
    produits: [],
    prixTotal: 0,
    etatCommande: ''
  };
  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private dataService: DataService,
    private clientAuthService: ClientAuthService
  ) {
    // check if not logged
    this.clientAuthService.checkNotLogged();
  }
  // this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  ngOnInit() {
    if (JSON.parse(localStorage.getItem('paymentInfo')) != null) {
      this.paymentInfo = JSON.parse(localStorage.getItem('paymentInfo'));
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
          });
      } else {
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
    this.paymentState = 1;
    localStorage.setItem('paymentState', JSON.stringify(this.paymentState));
    const myDate = new Date();
    const date = myDate.getDate();
    const month = myDate.getMonth();
    const year = myDate.getFullYear();
    const dateString = date + '-' + (month + 1) + '-' + year;
    this.orderDetails.nom = this.nomComplet;
    this.orderDetails.adresse = this.adress;
    this.orderDetails.tel = this.tel;
    this.orderDetails.date = dateString;
    this.orderDetails.produits = this.orderList;
    this.orderDetails.prixTotal = this.totalPrice * 1.13;
    this.orderDetails.etatCommande = 'En attente';
    localStorage.setItem('orderDetails', JSON.stringify(this.orderDetails));
    this.dataService.saveOrder();
    localStorage.removeItem('slProducts');
    this.router.navigate(['/order3']);
  }
}
