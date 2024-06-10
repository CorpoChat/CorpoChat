import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data == null ? null : JSON.parse(data);
  }

  setData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  deleteData(key: string) {
    localStorage.removeItem(key);
  }

  clearAll(key: string) {
    localStorage.clear();
  }
}
