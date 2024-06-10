import { Component } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BasePageComponent {

  constructor(
    strs: StorageService,
    toastr: ToastrService,
    router: Router
  ) {
    super(strs, toastr, router);
  }

  
}