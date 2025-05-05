import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from '../../core/services/cookeeService'; // Ajusta la ruta si es diferente

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router, private cookieService: CookieService) {}

  logout() {
    localStorage.clear(); // Limpia localStorage
    this.cookieService.delete('appToken'); // Elimina la cookie del token (ajusta el nombre si es diferente)
    this.router.navigate(['/auth']);
  }
}
