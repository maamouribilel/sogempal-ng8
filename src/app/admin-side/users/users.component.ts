import { Component, OnInit, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { BackDataService } from '../shared/services/back-data.service';
import { FormControl } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  userData: any;
  users: any[] = [];
  usersSubscription: Subscription;
  etatInput = new FormControl();
  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    private backDataService: BackDataService,
    private toastr: ToastrService
  ) {
    if (this.authService.isAdmin() && this.authService.isLoggedIn()) {
      this.userData = JSON.parse(localStorage.getItem('userData'));
      console.log('mrigel');
    } else {
      console.log('mouch mrigel');
    }
    // get users

    this.usersSubscription = this.backDataService.getUsers().subscribe(res => {
      this.users = res.map(item => {
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

  // update User
  onUpdateUser(user) {
    let etatUser;
    this.backDataService.getBlock(user).subscribe(etat => {
      etatUser = etat['block'];
    });

    if (
      this.etatInput.value != null &&
      this.etatInput.value != '' &&
      etatUser != this.etatInput.value
    ) {
      const newUser: any = {
        block: this.etatInput.value
      };
      this.backDataService.updateUser(user, newUser);
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    } else {
      this.toastr.error(`Veuillez changer l'état de l'utilisateur d'abord!`);
    }
  }
  //
  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
}
