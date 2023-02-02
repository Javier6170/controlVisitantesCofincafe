import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMediumDatetime',
})
export class FormatMediumDatetimePipe implements PipeTransform {
  transform(day: Date): Date {
    return day;
  }
}
