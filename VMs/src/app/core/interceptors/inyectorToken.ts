import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { CookieService } from "../services/cookeeService";

export function provideAuthenticationInterceptor(cookieService: CookieService): HttpInterceptorFn {
  return (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
      let req = request.clone();
      const allowedOrigins = ['https://localhost:','http://10.216.24.76:'];

      if (!!allowedOrigins.find(origin => request.url.includes(origin))) {
          let token: string = '';

          if (cookieService.check('appToken')) {
              token += `${cookieService.get('appToken')}`;
          }

          // Solo establecer el encabezado 'Authorizationapi' si hay un token disponible
          if (token) {
              req = req.clone({
                  setHeaders: {
                      'Authorizationapi': token,
                  },
              });
          }
      }

      return next(req);
  };
}