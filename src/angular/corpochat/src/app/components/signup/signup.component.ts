import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends BasePageComponent {

  formSignUp: FormGroup;
  passwrdHidden: boolean = true;

  constructor(
    toastr: ToastrService,
    router: Router
  ) {
    super(toastr, router);
    this.formSignUp = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
      confirmPassword: new FormControl(null),
    });
  }
  
  signup() {
    const email = this.formSignUp.get('email')?.value;
    const password = this.formSignUp.get('password')?.value;
    const confirmPassword = this.formSignUp.get('confirmPassword')?.value;

    if (password != confirmPassword) {
      this.showError('Passwords need to match', '');
      return;
    }

    if (!this.validateCredentials(email, password))
      return;

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