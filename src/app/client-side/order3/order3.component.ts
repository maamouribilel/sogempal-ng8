import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-order3',
  templateUrl: './order3.component.html',
  styleUrls: ['./order3.component.css']
})
export class Order3Component implements OnInit {
  orderDetails: any;

  constructor(private router: Router) {
    if (JSON.parse(localStorage.getItem('orderDetails')) != null) {
      this.orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
      console.log(this.orderDetails.date);
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {}

  makePdf() {
    const node = document.getElementById('invoice');

    let img;
    let filename;
    let newImage;

    domtoimage
      .toPng(node, { bgcolor: '#fff' })

      .then(dataUrl => {
        img = new Image();
        img.src = dataUrl;
        newImage = img.src;

        img.onload = () => {
          const pdfWidth = img.width;
          const pdfHeight = img.height;

          // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

          let doc;

          if (pdfWidth > pdfHeight) {
            doc = new jsPDF('l', 'px', [pdfWidth, pdfHeight]);
          } else {
            doc = new jsPDF('p', 'px', [pdfWidth, pdfHeight]);
          }

          const width = doc.internal.pageSize.getWidth();
          const height = doc.internal.pageSize.getHeight();

          doc.addImage(newImage, 'PNG', 10, 10, width, height);
          filename = 'recu_de_paiement_' + this.orderDetails.nom + '.pdf';
          doc.save(filename);
        };
        console.log('ca marche! ');
      })
      .catch(error => {
        console.log(error);
      });
  }
}
