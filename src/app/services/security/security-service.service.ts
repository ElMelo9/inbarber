import { Injectable } from '@angular/core';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { getFromLocalStorage } from '../../helpers/storage-helper';

@Injectable({
  providedIn: 'root'
})
export class SecurityServiceService {

  constructor(
    //private jwtHelper: JwtHelperService
  ) {}

   // Método para verificar si el token existe y es válido
   isTokenValid(): boolean {
    const token = getFromLocalStorage('token');

    if (token) {
      return !this.isTokenExpired(token);
    }
    return false;
  }


  isTokenExpired(token: string): boolean {
    return true;
    //return this.jwtHelper.isTokenExpired(token); // Verifica si el token ha expirado
  }
}
