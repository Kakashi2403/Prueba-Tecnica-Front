import { Component, OnInit } from '@angular/core';
import { PagedList } from '../../core/models/PagedListModels';
import { TblUser } from '../users/models/tblusers';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../enviroment/enviroments';
import { ResponseModels } from '../../core/models/ResponseModels'; // 👈 Importa tu modelo de respuesta
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class UsersComponent implements OnInit {
  pagedList: PagedList<TblUser> = {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    list: []
  };

  private readonly endpoint = environment.apiListUsers;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers(this.pagedList.pageNumber, this.pagedList.pageSize);
  }

  loadUsers(pageNumber: number, pageSize: number): void {
    this.apiService.get<ResponseModels<PagedList<TblUser>>>(this.endpoint, {
      pageNumber,
      pageSize
    }).subscribe({
      next: (response) => {
        if (response.body) {
          this.pagedList = response.body;
        } else if (response.errors) {
          console.error('Errores al obtener los usuarios:', response.errors);
        }
      },
      error: (error) => {
        console.error('Error al cargar usuarios', error);
      }
    });
  }

  changePage(newPage: number): void {
    if (newPage < 1 || newPage > this.pagedList.totalPages) return;
    this.loadUsers(newPage, this.pagedList.pageSize);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
