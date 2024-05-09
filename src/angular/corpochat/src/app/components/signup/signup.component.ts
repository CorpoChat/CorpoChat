import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  public passwrdHidden: boolean = true;

  constructor(private toastr: ToastrService, 
    private router: Router
  ) {
  }
  
  signup() {
    this.router.navigate(['home']);
  }
}