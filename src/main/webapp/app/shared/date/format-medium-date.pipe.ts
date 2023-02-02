import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMediumDate',
})
export class FormatMediumDatePipe implements PipeTransform {
  transform(day: Date): Date {
    return day;
  }
}
