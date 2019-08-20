import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { BackDataService } from '../shared/services/back-data.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  userData: any;
  products: any[] = [];
  productsSubscription: Subscription;
  // add product
  productImage: {
    name: string;
  };
  selectedFile = null;
  hiddenId = new FormControl(null);
  nameInput = new FormControl();
  descriptionInput = new FormControl();
  categoryInput = new FormControl();
  priceInput = new FormControl();
  quantityInput = new FormControl();
  lengthInput = new FormControl();
  widthInput = new FormControl();
  heightInput = new FormControl();
  weightInput = new FormControl();
  constructor(
    public authService: AuthService,
    private backDataService: BackDataService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
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

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(event);
  }

  onAddProduct() {
    // img upload
    const file = this.selectedFile;
    const task = this.storage.upload('img/' + file.name, file);
    this.productImage = {
      name: file.name
    };

    const newProd: any = {
      hiddenId: this.hiddenId.value,
      name: this.nameInput.value,
      description: this.descriptionInput.value,
      category: this.categoryInput.value,
      price: this.priceInput.value,
      quantity: this.quantityInput.value,
      length: this.lengthInput.value,
      width: this.widthInput.value,
      height: this.heightInput.value,
      weight: this.weightInput.value,
      image: this.productImage,
      addedDate: new Date()
      // image
    };

    console.log('TCL: ProductsComponent -> onAddProduct -> newProd', newProd);

    this.backDataService.addProduct(newProd);

    this.hiddenId.setValue('');
    this.nameInput.setValue('');
    this.descriptionInput.setValue('');
    this.categoryInput.setValue('');
    this.priceInput.setValue('');
    this.quantityInput.setValue('');
    this.lengthInput.setValue('');
    this.widthInput.setValue('');
    this.heightInput.setValue('');
    this.weightInput.setValue('');

    /*
    this.timeInput.setValue('');
    this.subjectInput.setValue('');
    this.locationInput.setValue('');
    this.descriptionInput.setValue('');

    this.modal.hide();
  */
  }
}
