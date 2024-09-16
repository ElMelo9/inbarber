import { Injectable } from '@angular/core';
import { getFromLocalStorage } from '../../helpers/storage-helper';

@Injectable({
  providedIn: 'root'
})
export class SecurityServiceService {

  constructor(
  ) {}

   isTokenValid(): boolean {
    const token = getFromLocalStorage('token');

    if (token) {
      return !this.isTokenExpired(token);
    }
    return false;
  }


  isTokenExpired(token: string): boolean {  
    if (token) {
      const expirationDate = new Date(getFromLocalStorage('exp') * 1000);
      return expirationDate > new Date(); // Retorna true si el token no ha expirado
    }
    return false; // Retorna false si no hay token o ha expirado

  }
}
