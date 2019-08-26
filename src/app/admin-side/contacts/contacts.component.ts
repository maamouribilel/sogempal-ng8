import { Component, OnInit, NgZone, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { BackDataService } from '../shared/services/back-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  userData: any;
  contacts: any[] = [];
  htmlMsgContent: string;
  contactsSubscription: Subscription;
  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    private backDataService: BackDataService,
    private toastr: ToastrService
  ) {
    /*
    if (this.authService.isAdmin() && this.authService.isLoggedIn()) {
      this.userData = JSON.parse(localStorage.getItem('userData'));
    } else {
      this.router.navigate(['/admin']);
    }
*/
    this.contactsSubscription = this.backDataService
      .getContacts()
      .subscribe(res => {
        this.contacts = res.map(item => {
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
  onUpdateState(contact) {
    const newContact: any = {
      msgState: 'read'
    };
    this.backDataService.updateContact(contact, newContact);

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });

    // this.router.navigate(['admin/contacts']);
  }
  ngOnDestroy() {
    this.contactsSubscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
}
