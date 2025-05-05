import { TblVirtualMachineRequest } from '../models/TblVirtualMachineRequest';
import { TblVirtualMachineResponse } from '../models/TblVirtualMachineResponse';

export function mapResponseToRequest(vm: TblVirtualMachineResponse): TblVirtualMachineRequest {
    return {
      id: vm.id,                // id es mapeado directamente
      name: vm.name,
      cores: vm.cores,
      ramGb: vm.ramGb,
      diskGb: vm.diskGb,
      operatingSystem: atob(vm.operatingSystem), // Decodificamos el sistema operativo
      createdAt: vm.createdAt,   // Mapear 'createdAt' desde la respuesta
      isActive: vm.isActive      // Mapear 'isActive' desde la respuesta
    };
  }
  
