import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeBase64',
  standalone: true
})
export class DecodeBase64Pipe implements PipeTransform {
  transform(value: string): string {
    try {
      return atob(value);  // Función nativa para decodificar base64
    } catch (error) {
      return 'Error al decodificar';
    }
  }
}
