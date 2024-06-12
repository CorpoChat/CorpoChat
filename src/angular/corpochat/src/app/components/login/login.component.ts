import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasePageComponent } from '../base-page/base-page.component';
import { StorageService } from 'src/app/services/storage.service';
import { Environment } from 'src/app/global/environment';
import { CorpochatService } from 'src/app/services/corpochat.service';

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

    if (strs.getData(Environment.KEY_USER_LOGGED) === true) {
      this.navigateTo('home');
      return;
    }

    this.formSignIn = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }

  logIn() {
    const email = this.formSignIn.get('email')?.value;
    const password = this.formSignIn.get('password')?.value;

    if (!this.validateCredentials(email, password))
      return;

    this.strs.setData(Environment.KEY_USER_LOGGED, true);
    this.navigateTo('home');
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