import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resumir'
})
export class ResumirPipe implements PipeTransform {

  transform(string: string, maximo: number, keeplast?: number): string {
    if (string) {
      let resumido = '';
      if (!maximo) {
        resumido = string;
      } else if (maximo >= string.length) {
        resumido = string;
      } else if (string.length > maximo) {
        resumido = `${string.substr(0, maximo)}...`;
        if (keeplast) {
          const start = string.length - keeplast;
          const end = string.length;
          const last = string.substr(start, end);
          resumido = `${string.substr(0, maximo)}... ${last}`;
        }
      } else {
        resumido = string;
      }
      return resumido;
    }
  }


}
