import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customcase'
})
export class CustomcasePipe implements PipeTransform {

  transform(value: string): string {
    value=value.replace(value[0],value[0].toLocaleUpperCase());
    return value;
  }

}
