import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  // Asegúrate de importar Router
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,  // Esto indica que el componente es Standalone
  imports: [CommonModule],  // Asegúrate de incluir CommonModule aquí
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userPrivileges: string[] = []; // Privilegios del usuario
  availableOptions: any[] = []; // Opciones de menú disponibles

  constructor(private router: Router) {}  // Inyecta Router

  ngOnInit(): void {
    // Obtener los privilegios del usuario desde localStorage
    const userPrivilegesStr = localStorage.getItem('userPrivileges');
    if (userPrivilegesStr) {
      this.userPrivileges = JSON.parse(userPrivilegesStr);
    }

    // Configurar las opciones de menú dependiendo de los privilegios
    this.setMenuOptions();
  }

  setMenuOptions(): void {
    // Ejemplo: configurar opciones de menú dependiendo de los privilegios
    this.availableOptions = [];

    if (this.userPrivileges.includes('ListUsers')) {
      this.availableOptions.push({ name: 'Lista de Usuarios', route: '/users' });
    }
    if (this.userPrivileges.includes('ListVMs')) {
      this.availableOptions.push({ name: 'Lista de Maquinas Virtuales', route: '/vms' });
    }
    
  }

  // Función para navegar a una opción de menú usando Router
  navigateTo(route: string): void {
    this.router.navigate([route]);  // Usa el enrutador de Angular
  }
}
