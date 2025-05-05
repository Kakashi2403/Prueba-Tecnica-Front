import { Component, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { environment } from '../../../../../enviroment/enviroments';
import { TblVirtualMachineRequest } from '../../models/TblVirtualMachineRequest';
import { TblVirtualMachineResponse } from '../../models/TblVirtualMachineResponse';
import { ResponseModels } from '../../../../core/models/ResponseModels';

@Component({
  selector: 'app-updatevms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updatevms.component.html',
  styleUrls: ['./updatevms.component.scss']
})
export class UpdatevmsComponent {
  @Input() virtualMachine!: TblVirtualMachineRequest;
  @Output() close = new EventEmitter<void>();
  @Output() vmUpdated = new EventEmitter<void>();


  private readonly endpointBase = environment.apiUpdateVMs; // Ej: /api/vms

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['virtualMachine']) {
      console.log('Recibida VM para editar:', changes['virtualMachine'].currentValue);
    }
  }

  onUpdate(): void {
    if (!this.virtualMachine?.id) {
      alert('❌ La máquina virtual no tiene un ID válido.');
      return;
    }

    // Codifica el sistema operativo en base64
    const base64OperatingSystem = btoa(this.virtualMachine.operatingSystem);
    this.virtualMachine.operatingSystem = base64OperatingSystem;

    const endpoint = `${this.endpointBase}`;

    const updatedVM = this.virtualMachine;

    this.apiService
      .put<ResponseModels<TblVirtualMachineResponse>>(endpoint, updatedVM)
      .subscribe({
        next: (response) => {
          if (response.body) {
            const decodedOS = atob(response.body.operatingSystem);
            alert(`✅ Máquina virtual actualizada correctamente. SO: ${decodedOS}`);
            this.vmUpdated.emit(); // Notifica al componente padre
            this.closeModal();     // Cierra el modal
          } else if (response.errors?.length) {
            alert(`❌ Error: ${response.errors[0].message}`);
          } else {
            alert('❌ Error desconocido.');
          }
        },
        error: (error) => {
          console.error('Error al actualizar la VM:', error);
          alert('❌ Error en la petición al servidor.');
        }
      });
  }

  closeModal(): void {
    this.close.emit();
  }
}
