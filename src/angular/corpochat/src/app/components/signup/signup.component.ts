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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends BasePageComponent {

  formSignUp: FormGroup;
  passwrdHidden: boolean = true;

  constructor(
    strs: StorageService,
    ccs: CorpochatService,
    toastr: ToastrService,
    router: Router
  ) {
    super(strs, ccs, toastr, router);
    this.formSignUp = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      confirmPassword: new FormControl(null),
    });
  }

  signup() {
    const name = this.formSignUp.get('name')?.value;
    const mail = this.formSignUp.get('email')?.value;
    const pswd = this.formSignUp.get('password')?.value;
    const confirmPassword = this.formSignUp.get('confirmPassword')?.value;
    const mailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

    const account: Account = {
      email: mail,
      password: pswd,
      name: name
    };

    if (name == null || name == '' || name.length < 3) {
      this.showError('Invalid Name', 'Invalid name, you need at leat 4 caracters');
      return;
    }

    if (!this.validateCredentials(mail, pswd))
      return;

    this.ccs.addNewUser(account, confirmPassword)
      .subscribe({
        next: (result) => {
          if (result) {
            this.strs.setData(Environment.KEY_ACCOUNT_STORED, account);
            this.strs.setData(Environment.KEY_USER_LOGGED, true);
            this.navigateTo('home');
          }
        },
        error: (err: HttpErrorResponse) => {
          err.error.forEach((element: { message: string; }) => {
            console.log(element.message);
            this.showError('Error', element.message);
          });
        },
      });
  }

  private validateCredentials(email: string, password: string): boolean {
    this.clearPopup();

    if (email == null || email.trim() == "") {
      this.showError('Email is required', '');
      return false;
    }

    if (password == null || password.trim() == "") {
      this.showError('Password is required', '');
      return false;
    }

    return true;
  }
}