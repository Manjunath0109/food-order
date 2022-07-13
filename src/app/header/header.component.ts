import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getFoodMenu } from '../menu/store/food-order.actions';
import { FoodOrderPartialState } from '../menu/store/food-order.reducer';
import { cartItemsCount } from '../menu/store/food-order.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store<FoodOrderPartialState>) {}
  cartItemsCount$ = this.store.select(cartItemsCount);
  opened = false;

  ngOnInit(): void {
    this.store.dispatch(getFoodMenu());
  }
}
