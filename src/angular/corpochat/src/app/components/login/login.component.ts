import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasePageComponent } from '../base-page/base-page.component';
import { StorageService } from 'src/app/services/storage.service';
import { Environment } from 'src/app/global/environment';
import { CorpochatService } from 'src/app/services/corpochat.service';
import { Account } from 'src/app/model/account.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BasePageComponent {

  formSignIn!: FormGroup;
  passwrdHidden: boolean = true;

  constructor(
    strs: StorageService,
    ccs: CorpochatService,
    toastr: ToastrService,
    router: Router
  ) {
    super(strs, ccs, toastr, router);

    if (strs.getData(Environment.KEY_USER_LOGGED) === true && 
        strs.getData(Environment.KEY_ACCOUNT_STORED) != null) {
      this.navigateTo('home');
      return;
    }

    this.formSignIn = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }

  logIn() {
    const mail = this.formSignIn.get('email')?.value;
    const pswd = this.formSignIn.get('password')?.value;
    const account: Account = {
      email: mail,
      password: pswd,
      name: ''
    };

    this.ccs.getLogin(account)
      .subscribe({
        next: (result: Account) => {
          this.strs.setData(Environment.KEY_ACCOUNT_STORED, result);
          this.strs.setData(Environment.KEY_USER_LOGGED, true);
          this.navigateTo('home');
        },
        error: (err: HttpErrorResponse) => {
          err.error.forEach((element: { message: string; }) => {
            this.showError('Error', element.message);
          });
        },
      });
  }
}