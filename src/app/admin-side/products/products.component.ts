import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { BackDataService } from '../shared/services/back-data.service';
import { Subscription, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
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

  // update or add
  actionType = 'add';

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
        console.log(res);
        this.products = res.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          };
        });
        this.dtTrigger.next();
      });
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4,
      lengthMenu: [4, 8, 15, 20],
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
      }
    };
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(event);
  }
  // onAddtrigger
  onAddTrigger() {
    this.actionType = 'add';
  }
  /// add product
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
    this.modal.hide();
  */
  }
  // update product
  onUpdateTrigger(prod) {
    this.actionType = 'update';
    // set form data
    this.hiddenId.setValue(prod.id);
    this.nameInput.setValue(prod.name);
    this.descriptionInput.setValue(prod.description);
    this.categoryInput.setValue(prod.category);
    this.priceInput.setValue(prod.price);
    this.quantityInput.setValue(prod.quantity);
    this.lengthInput.setValue(prod.length);
    this.widthInput.setValue(prod.width);
    this.heightInput.setValue(prod.height);
    this.weightInput.setValue(prod.weight);
  }
  // update product
  onUpdateProduct() {
    // img upload
    const file = this.selectedFile;
    if (file) {
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
      };
      this.backDataService.updateProduct(newProd);
    } else {
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
        addedDate: new Date()
      };
      this.backDataService.updateProduct(newProd);
    }
  }

  // delete product
  onDeleteProd(prodId: string) {
    if (confirm('Are you sure?')) {
      this.backDataService.deleteProduct(prodId);
      this.dtTrigger.next();
    }
  }
}
