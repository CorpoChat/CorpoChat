import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent {

  activeToast: ActiveToast<any>[] = [];

  constructor(
    protected strs: StorageService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  protected navigateTo(route: string) {
    this.router.navigate([route]);
  }

  protected clearPopup() {
    this.activeToast.forEach(toast => { this.toastr.clear(toast.toastId) });
    this.activeToast = [];
  }

  protected showSuccess(title: string = 'Sucess', message: string = '') {
    const toast = this.toastr.success(message, title);
    this.activeToast.push(toast);
  }

  protected showError(title: string = 'Sucess', message: string = '') {
    const toast = this.toastr.error(message, title);
    this.activeToast.push(toast);
  }

  protected showWarning(title: string = 'Sucess', message: string = '') {
    const toast = this.toastr.warning(message, title);
    this.activeToast.push(toast);
  }
}
