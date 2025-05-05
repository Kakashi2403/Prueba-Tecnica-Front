export interface TblVirtualMachineRequest {
  id?: string;  
  name: string;
    cores: number;
    ramGb: number;
    diskGb: number;
    operatingSystem: string;   // byte[] → Uint8Array
    createdAt: string;             // DateTime → string (ISO format)
    isActive: boolean;
  }
  