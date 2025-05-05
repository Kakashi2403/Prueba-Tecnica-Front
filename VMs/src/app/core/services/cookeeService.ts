import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() {}

  // Establecer una cookie con una fecha de expiración
  public set(name: string, value: string, expirationDate: Date | number = 0, path: string = '/'): void {
    if (typeof document !== 'undefined') {
      let expires = '';
      if (expirationDate) {
        if (typeof expirationDate === 'number') {
          const date = new Date();
          date.setTime(date.getTime() + expirationDate * 1000);  // Expiración en segundos
          expires = 'expires=' + date.toUTCString();
        } else {
          expires = 'expires=' + expirationDate.toUTCString();
        }
      }
      document.cookie = `${name}=${value};${expires};path=${path}`;
    }
  }

  // Obtener el valor de una cookie
  public get(name: string): string {
    if (typeof document !== 'undefined') {
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookies = decodedCookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${name}=`)) {
          return cookie.substring(name.length + 1);
        }
      }
    }
    return '';
  }

  // Eliminar una cookie
  public delete(name: string, path: string = '/'): void {
    if (typeof document !== 'undefined') {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
    }
  }

  // Verificar si una cookie existe
  public check(name: string): boolean {
    return this.get(name) !== '';
  }
}
