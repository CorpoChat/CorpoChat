import { Component } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BasePageComponent {

  constructor(
    toastr: ToastrService,
    router: Router
  ) {
    super(toastr, router);
  }

}