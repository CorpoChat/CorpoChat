import { Component, OnInit } from '@angular/core';
import { Settings } from './global/settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    const userAgent: string = navigator.userAgent.toLowerCase();
    const isMobile: boolean = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
    Settings.updateDevice(isMobile);
  }
}