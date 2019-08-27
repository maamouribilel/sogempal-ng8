import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  constructor(private dataService: DataService) {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(7)]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.email
      ]),
      sujet: new FormControl('', [
        Validators.required,
        Validators.minLength(7)
      ]),
      contenu: new FormControl('', [
        Validators.required,
        Validators.minLength(20)
      ])
    });
  }

  ngOnInit() {}
  onSaveContact() {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const dateString = date + '-' + (month + 1) + '-' + year;

    const contact: any = {
      name: this.contactForm.get('name').value,
      email: this.contactForm.get('email').value,
      subject: this.contactForm.get('sujet').value,
      msgContent: this.contactForm.get('contenu').value,
      sentDate: dateString,
      msgState: 'unread'
    };
    this.dataService.saveContact(contact);
    this.contactForm.reset();
  }
}
