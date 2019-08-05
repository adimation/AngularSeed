import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  saveToken(token: string): void {
    localStorage.setItem('X-AUTH-Token', token);
  }

  getToken(): string {
    const token = localStorage.getItem('X-AUTH-Token');
    return token;
  }

  removeToken(): void {
    localStorage.removeItem('X-AUTH-Token');
  }
}
