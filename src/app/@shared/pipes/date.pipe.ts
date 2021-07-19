import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'dateTrans'})
export class DateTransPipe implements PipeTransform {
  transform(value: string): string {
    if (value.constructor === String && Date.parse(value)) {
        const parsedDate = new Date(value).toLocaleDateString(undefined, {
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          });

          return parsedDate;
      }
    return value;
  }
}