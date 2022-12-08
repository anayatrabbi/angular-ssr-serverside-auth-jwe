import { Component } from '@angular/core';
import { Injectable, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  constructor(
    // @Inject(PLATFORM_ID) private platformId: Object,
    // private readonly transferState: TransferState,
    // private contactService: ContactService
  ) {
    // if (isPlatformBrowser(this.platformId)) {
    //   //get message from transferState if browser side
    //   this.message = this.transferState.get(storeKey, 'defaultMessageValue');
    // } //server side: get provided message and store in in transfer state
    // else {
    //   this.transferState.set(storeKey, this.message);
    // }

    // this.contactService
    //   .getSession('http://localhost:4200/api/session')
    //   .subscribe();

    // this.contactService
    //   .getItems('http://localhost:4200/api/contact')
    //   .subscribe();
  }
}
