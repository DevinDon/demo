import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'readify' })
export class ReadifyPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 0) {
      return '0 ';
    }
    if (value < 10000) {
      return Math.floor(value).toFixed(0) + ' ';
    }
    if (value < 10000 * 10000) {
      return (Math.floor(value / 10000 * 10) / 10).toFixed(1).replace('.0', '') + ' 万';
    }
    return (Math.floor(value / 10000 / 10000 * 10) / 10).toFixed(1).replace('.0', '') + ' 亿';
  }

}
