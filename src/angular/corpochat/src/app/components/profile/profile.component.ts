import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CorpochatService } from 'src/app/services/corpochat.service';
import { StorageService } from 'src/app/services/storage.service';
import { BasePageComponent } from '../base-page/base-page.component';
import { Environment } from 'src/app/global/environment';
import { Account } from 'src/app/model/account.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BasePageComponent {

  userName: string = '';
  userMail: string = '';

  constructor(
    strs: StorageService,
    ccs: CorpochatService,
    toastr: ToastrService,
    router: Router
  ) {
    super(strs, ccs, toastr, router);
    const acc: Account = strs.getData(Environment.KEY_ACCOUNT_STORED);
    this.userName = acc.name;
    this.userMail = acc.email;
  }

  logout() {
    this.strs.clearAll();
    this.navigateTo('login');
  }
}