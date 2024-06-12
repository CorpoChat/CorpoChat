import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CorpochatService } from 'src/app/services/corpochat.service';
import { StorageService } from 'src/app/services/storage.service';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BasePageComponent {

  constructor(
    strs: StorageService,
    ccs: CorpochatService,
    toastr: ToastrService,
    router: Router
  ) {
    super(strs, ccs, toastr, router);
  }

  
}