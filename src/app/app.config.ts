import { ApplicationConfig } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtHelperService, JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { SecurityServiceService } from './services/security/security-service.service';

export function jwtOptionsFactory(securityService: SecurityServiceService) {
  return {
    tokenGetter: () => localStorage.getItem('token') || null,
    allowedDomains: ["example.com"], // Ajusta según tus necesidades
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    // Proporciona JWT_OPTIONS y JwtHelperService como providers
    {
      provide: JWT_OPTIONS,
      useFactory: jwtOptionsFactory,
      deps: [SecurityServiceService]
    },
    JwtHelperService,
    SecurityServiceService
  ]
};