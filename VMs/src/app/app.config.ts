import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors,HTTP_INTERCEPTORS,HttpClientModule  } from '@angular/common/http';
import { provideAuthenticationInterceptor } from './core/interceptors/inyectorToken';
import { CookieService } from './core/services/cookeeService';

const cookieService = new CookieService();

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(), 
    provideHttpClient(
      withFetch(),
      withInterceptors([
        provideAuthenticationInterceptor(cookieService)
      ])
    )
  ]
};
