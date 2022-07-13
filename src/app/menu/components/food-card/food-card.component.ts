import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getFoodMenu,
  addToCart,
  changeQuantity,
} from '../../store/food-order.actions';
import { getAllMenuItems } from '../../store/food-order.selector';
import {
  CategorizedMenuItems,
  MenuItems,
} from 'src/app/models/food-order.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { FormControl } from '@angular/forms';
import { FoodOrderPartialState } from '../../store/food-order.reducer';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
})
export class FoodCardComponent implements OnInit {
  menuItems$: Observable<CategorizedMenuItems | any>;
  categoryFilterQuery: string[] = [];
  filter = {
    filterForm: new FormControl([]),
    values: [
      'Soup',
      'Veg Main Course',
      'Veg Starters',
      'Non Veg Main Course',
      'Fried Rice & Noodles',
      'Breads',
      'Tandoori Items',
      'Mocktails',
      'Briyani',
    ],
  };

  constructor(
    private store: Store<FoodOrderPartialState>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getFoodMenu());
    this.menuItems$ = this.store.select(getAllMenuItems).pipe(
      map((items) =>
        items.reduce(
          (acc, a) => ({
            ...acc,
            [a.subType]: [...acc[a.subType], a],
          }),
          {
            Soup: [],
            'Veg Main Course': [],
            'Veg Starters': [],
            'Non Veg Main Course': [],
            'Fried Rice & Noodles': [],
            Breads: [],
            'Tandoori Items': [],
            Mocktails: [],
            Briyani: [],
          }
        )
      )
    );
  }

  handleMinus(food: MenuItems): void {
    if (food.quantity > 0) {
      this.store.dispatch(
        changeQuantity({ id: food.id, isIncremented: false, value: 0 })
      );
    }
  }

  handlePlus(food: MenuItems): void {
    if (food.quantity < 20) {
      this.store.dispatch(
        changeQuantity({ id: food.id, isIncremented: true, value: 0 })
      );
    }
  }

  handleChange(event, food: MenuItems): void {
    if (event.target.value) {
      this.store.dispatch(
        changeQuantity({
          id: food.id,
          isIncremented: false,
          value: event.target.value > 20 ? 20 : event.target.value,
        })
      );
    }
  }

  addToCart(food: MenuItems) {
    this.store.dispatch(addToCart({ food }));
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: `${food.name} added to Cart`,
        icon: 'check_circle',
        class: 'green_icon',
      },
      duration: 3000,
    });
  }

  applyFilters(event) {
    this.categoryFilterQuery = event.value;
  }

  identify(index: number, item: MenuItems): string {
    return item.id;
  }
}
