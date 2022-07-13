import { Pipe, PipeTransform } from '@angular/core';
import { CategorizedMenuItems } from 'src/app/models/food-order.model';

@Pipe({
  name: 'categoryFilter',
})
export class CategoryFilterPipe implements PipeTransform {
  transform(value: CategorizedMenuItems, query: string[]) {
    return query.length
      ? query.reduce((acc, quer) => ({ ...acc, [quer]: value[quer] }), {})
      : value;
  }
}
