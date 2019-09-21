import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { BackDataService } from '../shared/services/back-data.service';
import { Subscription, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
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
  // show or hide modal
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;

  constructor(
    public authService: AuthService,
    private backDataService: BackDataService,
    private storage: AngularFireStorage,
    private router: Router
  ) {
    /*
    if (this.authService.isAdmin() && this.authService.isLoggedIn()) {
      this.userData = JSON.parse(localStorage.getItem('userData'));
    } else {
      this.router.navigate(['/admin']);
    }
    */
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
    this.dtTrigger.unsubscribe();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }
  // onAddtrigger
  onAddTrigger() {
    this.actionType = 'add';
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
  }
  /// add product
  onAddProduct() {
    // img upload
    const file = this.selectedFile;
    const task = this.storage.upload('img/' + file.name, file);
    this.productImage = {
      name: file.name
    };
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const dateString = date + '-' + (month + 1) + '-' + year;
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
      addedDate: dateString
      // image
    };

    this.backDataService.addProduct(newProd);
    // reset datatable
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });

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
        image: this.productImage
      };
      this.backDataService.updateProduct(newProd);
      // reset datatable
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        //   this.dtTrigger.next();
      });
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
        weight: this.weightInput.value
      };
      this.backDataService.updateProduct(newProd);
      // reset datatable
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        //     this.dtTrigger.next();
      });
    }
  }

  // delete product
  onDeleteProd(prodId: string) {
    if (confirm('Est-ce que vous êtes sûre?')) {
      this.backDataService.deleteProduct(prodId);
      // reset datatable
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
  }
}
