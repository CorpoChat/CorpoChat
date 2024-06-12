import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
import { Environment } from '../global/environment';
import { Observable } from 'rxjs';
import { Account } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class CorpochatService {
  private hubConnection: signalR.HubConnection;
  private apiUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = Environment.BASE_API_URL;
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(this.apiUrl + '/Chat').build();
    this.hubConnection.start();
  }

  public sendMessage(emailTarget: string, message: string): void {
    this.hubConnection.invoke('SendMessage', emailTarget, message).catch(err => console.error(err));
  }

  public onMessageReceived(callback: (emailTarget: string, message: string) => void): void {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  public getAccounts() : Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + '/Accounts');
  }

  public addNewUser(account: Account, passwordConfirmation: string) : Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/Accounts' + `?confirmPassword=${passwordConfirmation}`, account);
  }

  public getLogin(account: Account) : Observable<Account> {
    return this.http.put<Account>(this.apiUrl + '/Accounts', account);
  }

  public deleteAccount(account: Account) : Observable<boolean> {
    var query = `?Email=${account.email}`;

    return this.http.delete<boolean>(this.apiUrl + '/Accounts' + query);
  }
}
