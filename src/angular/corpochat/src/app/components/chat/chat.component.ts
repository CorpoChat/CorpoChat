import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CorpochatService } from 'src/app/services/corpochat.service';
import { StorageService } from 'src/app/services/storage.service';
import { BasePageComponent } from '../base-page/base-page.component';
import { Message } from 'src/app/model/message.model';
import { Environment } from 'src/app/global/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent extends BasePageComponent implements OnInit {
  private messages: Map<string, Message[]>;
  messageText: string = '';

  constructor(
    strs: StorageService,
    ccs: CorpochatService,
    toastr: ToastrService,
    router: Router
  ) {
    super(strs, ccs, toastr, router);
    this.messages = new Map<string, Message[]>();
  }

  ngOnInit(): void {
    this.messages = this.strs.getData(Environment.KEY_MESSAGES_HISTORY);

    this.ccs.onMessageReceived((emailTarget, message) => {
      if (emailTarget != this.userMail)
        return;

      if (!this.messages.has(emailTarget))
        this.messages.set(emailTarget, []);

      var currentMessages = this.messages.get(emailTarget)!;
      currentMessages.push({ receiving: true, messageText: message });
      this.messages.set(emailTarget, currentMessages);
    });
  }

  sendMessage(targetMail: string, message: string): void {
    this.ccs.sendMessage(targetMail, message);
    
    if (!this.messages.has(targetMail))
      this.messages.set(targetMail, []);

    var currentMessages = this.messages.get(targetMail)!;
    currentMessages.push({ receiving: false, messageText: message });
    this.messages.set(targetMail, currentMessages);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event): void {
    this.strs.setData(Environment.KEY_MESSAGES_HISTORY, this.messages);
  }
}
