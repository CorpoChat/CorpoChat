import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Environment } from '../global/environment';

@Injectable({
  providedIn: 'root'
})
export class CorpochatService {
  private hubConnection: signalR.HubConnection;
  private baseUrl: string;

  constructor() {
    this.baseUrl = Environment.BASE_API_URL;
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(this.baseUrl + '/Chat').build();
    this.hubConnection.start().catch(err => console.error(err));
  }

  public sendMessage(emailTarget: string, message: string): void {
    this.hubConnection.invoke('SendMessage', emailTarget, message).catch(err => console.error(err));
  }

  public onMessageReceived(callback: (emailTarget: string, message: string) => void): void {
    this.hubConnection.on('ReceiveMessage', callback);
  }
}
