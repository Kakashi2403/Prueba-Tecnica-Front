import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // Verificar si estamos en un entorno de navegador
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      const userRole = localStorage.getItem('userRole');
      const userPrivileges = JSON.parse(localStorage.getItem('userPrivileges') || '[]');

      // Si no hay token, redirigir a la página de login
      if (!token) {
        return this.router.createUrlTree(['/auth']);
      }

      // Validar contra los roles requeridos por la ruta
      const expectedRoles = route.data['roles'] as string[];
      if (expectedRoles && !expectedRoles.includes(userRole!)) {
        return this.router.createUrlTree(['/unauthorized']); // Redirige a una página de "no autorizado" si el rol no coincide
      }

      // Validar contra los privilegios requeridos por la ruta
      const expectedPrivileges = route.data['privileges'] as string[];
      if (expectedPrivileges && !expectedPrivileges.some(priv => userPrivileges.includes(priv))) {
        return this.router.createUrlTree(['/unauthorized']); // Redirige si no tiene el privilegio necesario
      }
    } else {
      // Si no estamos en un entorno de navegador (por ejemplo, SSR), redirigir a la página de login
      return this.router.createUrlTree(['/auth']);
    }

    return true;
  }
}
