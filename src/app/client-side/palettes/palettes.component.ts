import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-palettes',
  templateUrl: './palettes.component.html',
  styleUrls: ['./palettes.component.css']
})
export class PalettesComponent implements OnInit {
  products: any[] = [];
  showSpinner = true;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getPalettes().subscribe(products => {
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
