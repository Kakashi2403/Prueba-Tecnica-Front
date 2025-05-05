import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from '../../core/services/cookeeService';
import { Router } from '@angular/router';
import { ResponseModels } from '../../core/models/ResponseModels';
import { TokenResponse } from './models/TokenResponse';
import { environment } from '../../../enviroment/enviroments';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  formLogin: FormGroup = new FormGroup({});
  isLoading = false;  // Para mostrar un indicador de carga

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80)
      ])
    });
  }

  sendLogin() {
    const { email, password } = this.formLogin.value;
  
    // Si ya existe un token, redirige al home
    if (this.cookieService.check('appToken')) {
      this.router.navigate(['/home']);
      return;
    }
  
    this.isLoading = true;  // Activamos el indicador de carga
  
    this.http.post<ResponseModels<TokenResponse>>(environment.apiToken, { email, password })
      .pipe(
        catchError(error => {
          this.isLoading = false;  // Desactiva el indicador de carga
          console.error('Error de autenticación', error);
          alert('Hubo un error al intentar iniciar sesión. Intenta nuevamente.');
          return of(null);  // Maneja el error y retorna un valor predeterminado
        })
      )
      .subscribe({
        next: (response: ResponseModels<TokenResponse> | null) => {
          this.isLoading = false;  // Desactiva el indicador de carga
  
          // Verifica si la respuesta no es null
          if (response && response.body?.accessToken) {
            const decodedJWT = JSON.parse(atob(response.body.accessToken.split('.')[1]));
            const expireCookie = new Date(decodedJWT.exp * 1000);
  
            // Guardamos el token en cookies y localStorage
            this.cookieService.set('appToken', response.body.accessToken, expireCookie);
            localStorage.setItem('accessToken', response.body.accessToken);
            localStorage.setItem('userRole', decodedJWT.role);
            localStorage.setItem('userPrivileges', JSON.stringify(decodedJWT.privilege));
  
            // Redirige al home
            this.router.navigate(['/home']);
          } else {
            // Si no hay token, muestra un mensaje de error
            alert('Credenciales incorrectas');
          }
        },
        error: (error) => {
          console.error('Error en la suscripción', error);
        }
      });
  }
}
