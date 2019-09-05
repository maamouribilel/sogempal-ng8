import {
  Component,
  OnInit,
  OnDestroy,
  DoCheck,
  ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { BackDataService } from '../shared/services/back-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.css']
})
export class DashHeaderComponent implements OnInit, OnDestroy {
  userData: any;
  msgsSubscription: Subscription;
  unreadMsgsSubscription: Subscription;
  htmlMsgContent: string;
  msgs: any[] = [];
  unreadMsgs: number;
  constructor(
    public authService: AuthService,
    public router: Router,
    private backDataService: BackDataService
  ) {
    if (this.authService.isAdmin() && this.authService.isLoggedIn()) {
      this.userData = JSON.parse(localStorage.getItem('userData'));
    } else {
      this.router.navigate(['/admin']);
    }
    // unread msgs
    this.unreadMsgsSubscription = this.backDataService
      .getUnreadMsgs()
      .subscribe(result => {
        this.unreadMsgs = result.length;
        //  this.cdr.detectChanges();
        //  this.checkChange();
      });
    // msgs
    this.msgsSubscription = this.backDataService
      .getContacts()
      .subscribe(res => {
        this.msgs = res.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          };
        });
      });
  }

  ngOnInit() {
    // this.checkChange();
  }
  onUpdateState(msgg) {
    const newContact: any = {
      msgState: 'read'
    };
    this.backDataService.updateContact(msgg, newContact);
  }
  ngOnDestroy(): void {
    this.msgsSubscription.unsubscribe();
    this.unreadMsgsSubscription.unsubscribe();
  }

  checkChange() {
    /*
    const allMsgs = this.msgs.length;
    setInterval(allMsgs => {
      if (allMsgs !== this.msgs.length) {
        // this.playAudio();
        console.log('changed');

        return false;
      }
    }, 2000);
    */
  }
  playAudio() {
    const audio = new Audio();
    audio.src = '../../../assets/audio/notif.mp3';
    audio.load();
    audio.play();
  }
}
