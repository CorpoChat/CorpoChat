import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActiveToast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formSignUp: FormGroup;
  activeToast: ActiveToast<any>[] = [];
  remember: boolean = false;
  passwrdHidden: boolean = true;


  constructor(private toastr: ToastrService, 
    private router: Router
  ) {
    this.formSignUp = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    })
  }

  logIn() {
    const email = this.formSignUp.get('email')?.value;
    const password = this.formSignUp.get('password')?.value;

    if (!this.validateCredentials(email, password))
      return;
    
    this.toastr.success('', 'Success');
    this.router.navigate(['home']);
  }

  private validateCredentials(email: string, password: string): boolean {
    this.activeToast.forEach(toast => { this.toastr.clear(toast.toastId )});
    this.activeToast = [];

    if (email == null || email.trim() == "") {
      this.activeToast.push(this.toastr.error('', 'Email is required'));
      return false;
    }
    
    if (password == null || password.trim() == "") {
      this.activeToast.push(this.toastr.error('', 'Password is required'));
      return false;
    }
    
    return true;
  }
}