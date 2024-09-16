import { CanActivateFn, Router } from '@angular/router';
import { SecurityServiceService } from '../services/security/security-service.service';
import { inject } from '@angular/core';
import { getFromLocalStorage } from '../helpers/storage-helper';

export const authGuard: CanActivateFn = (route, state) => {
  const securityService = inject(SecurityServiceService);
  const router = inject(Router);

  const token = getFromLocalStorage('token');


  if (!token) {
    router.navigate(['/login']); 
    return false;
  }

  if(!securityService.isTokenExpired(token)) {
    router.navigate(['/login']); 
    return false;
  }
  return true;
};
