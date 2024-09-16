import { CanActivateFn, Router } from '@angular/router';
import { SecurityServiceService } from '../services/security/security-service.service';
import { inject } from '@angular/core';
import { getFromLocalStorage } from '../helpers/storage-helper';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(SecurityServiceService);
  const router = inject(Router);

  // Obtén el token del localStorage
  const token = getFromLocalStorage('token');

  // Verifica si el token existe y no ha expirado
  if (token ) {
    return true; // Permitir acceso si el token es válido
  } else {
    // Si el token no existe o ha expirado, redirige al login
    router.navigate(['/login']);
    return false; // Bloquear el acceso
  }
};
