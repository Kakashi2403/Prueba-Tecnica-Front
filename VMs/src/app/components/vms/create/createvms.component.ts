import { Component, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../enviroment/enviroments';
import { TblVirtualMachineRequest } from '../models/TblVirtualMachineRequest';
import { TblVirtualMachineResponse } from '../models/TblVirtualMachineResponse';
import { ResponseModels} from '../../../core/models/ResponseModels';

@Component({
  selector: 'app-createvms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './createvms.component.html',
  styleUrls: ['./createvms.component.scss']
})
export class CreatevmsComponent {
  @Output() close = new EventEmitter<void>();
  @Output() vmCreated = new EventEmitter<void>();

  virtualMachine: TblVirtualMachineRequest = {
    name: '',
    cores: 0,
    ramGb: 0,
    diskGb: 0,
    operatingSystem: '',
    createdAt: new Date().toISOString(),
    isActive: true
  };

  private readonly endpoint = environment.apiCreateVMs;

  constructor(private apiService: ApiService) {}

  onSubmit(): void {
    // Codifica el sistema operativo en base64
    const base64OperatingSystem = btoa(this.virtualMachine.operatingSystem);
    this.virtualMachine.operatingSystem = base64OperatingSystem;

    this.apiService
      .post<ResponseModels<TblVirtualMachineResponse>>(this.endpoint, this.virtualMachine)
      .subscribe({
        next: (response) => {
          if (response.body) {
            const decodedOS = atob(response.body.operatingSystem);
            alert(`✅ Máquina virtual creada correctamente con SO: ${decodedOS}`);
            this.vmCreated.emit();  // Notifica al componente padre que se creó una VM
            this.closeModal();      // Cierra el modal
          } else if (response.errors?.length) {
            alert(`❌ Error: ${response.errors[0].message}`);
          } else {
            alert('❌ Error desconocido.');
          }
        },
        error: (error) => {
          console.error('Error al crear la VM:', error);
          alert('❌ Error en la petición al servidor.');
        }
      });
  }

  closeModal(): void {
    this.close.emit();
  }
}
