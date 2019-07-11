import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-caisses',
  templateUrl: './caisses.component.html',
  styleUrls: ['./caisses.component.css']
})
export class CaissesComponent implements OnInit {
  products: any[] = [];
  showSpinner = true;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getCaisses().subscribe(products => {
      setTimeout(() => {
        this.showSpinner = false;
        this.products = products;
      }, 1000);
    });
  }
  onAddToSl(prod: any) {
    this.dataService.addToSl(prod);
  }
}
