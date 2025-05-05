import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { TblVirtualMachineResponse } from './models/TblVirtualMachineResponse';
import { environment } from '../../../enviroment/enviroments';
import { Router } from '@angular/router';
import { ResponseModels } from '../../core/models/ResponseModels';
import { PagedList } from '../../core/models/PagedListModels';
import { CreatevmsComponent } from '../vms/create/createvms.component';
import { DecodeBase64Pipe } from "../../core/pipe/decodeBase64.pipe";
import { UpdatevmsComponent } from "./update/updatevms/updatevms.component"; // Importa el componente CreateVmsComponent
import { TblVirtualMachineRequest } from './models/TblVirtualMachineRequest';
import { mapResponseToRequest } from './mappers/vm-mapper';


@Component({
  selector: 'app-vms',
  standalone: true,
  imports: [CommonModule, CreatevmsComponent, DecodeBase64Pipe, UpdatevmsComponent],  // Agrega CreateVmsComponent aquí
  templateUrl: './vms.component.html',
  styleUrls: ['./vms.component.scss']
})
export class VMsComponent implements OnInit {
  pagedList: PagedList<TblVirtualMachineResponse> = {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    list: []
  };

  virtualMachines: TblVirtualMachineResponse[] = [];
  isLoading = true;
  error: string | null = null;
  isModalOpen = false;  // Variable para controlar la visibilidad del modal
  isEditModalOpen = false;
  selectedVM: TblVirtualMachineRequest | null = null;

  private readonly endpoint = environment.apiListVMs;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadVMs(this.pagedList.pageNumber, this.pagedList.pageSize);
  }

  loadVMs(newPage: number, pageSize: number): void {
    const url = `${this.endpoint}?pageNumber=${newPage}&pageSize=${pageSize}`; // si tu backend soporta estos query params
    this.apiService.get<ResponseModels<PagedList<TblVirtualMachineResponse>>>(url).subscribe({
      next: (response) => {
        if (response.body) {
          this.pagedList = response.body;
        } else if (response.errors) {
          this.error = 'Errores al cargar las máquinas virtuales.';
          console.error('Errores:', response.errors);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar las VMs', err);
        this.error = 'Error al obtener datos de las máquinas virtuales.';
        this.isLoading = false;
      }
    });
  }
  

  changePage(newPage: number): void {
    if (newPage < 1 || newPage > this.pagedList.totalPages) return;
    this.loadVMs(newPage, this.pagedList.pageSize);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  openCreateModal(): void {
    this.isModalOpen = true;  // Abre el modal al cambiar la variable a true
  }

  // En VMsComponent
  closeCreateModal(): void {
    this.isModalOpen = false;  // Cierra el modal al cambiar la variable a false
  }

  onVMCreated(): void {
    this.loadVMs(this.pagedList.pageNumber, this.pagedList.pageSize); // Recarga la lista actual
  }

  openEditModal(vm: TblVirtualMachineResponse): void {
    this.selectedVM = mapResponseToRequest(vm);
    console.log('Selected VM for Edit:', this.selectedVM);  // Esto te ayudará a ver qué datos tiene selectedVM
    this.isEditModalOpen = true;
  }
  
  
  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedVM = null;
  }
  
  onVMUpdated() {
    this.closeEditModal();
    this.loadVMs(this.pagedList.pageNumber, this.pagedList.pageSize); // Recargar la lista si se modificó
  }
  
  deleteVM(vm: any) {
    if (confirm(`¿Seguro que deseas eliminar la VM "${vm.name}"?`)) {
      this.apiService.delete(`${environment.apiDeleteVMs}`+`${vm.id}`).subscribe({
        next: () => this.loadVMs(this.pagedList.pageNumber, this.pagedList.pageSize),
        error: err => console.error('Error al eliminar VM', err)
      });
    }
  }
}
