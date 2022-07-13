import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MenuItems, SnackBarData } from 'src/app/models/food-order.model';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import {
  changeQuantity,
  getFoodMenu,
  orderAllFromCart,
  orderFoodFromCart,
  removeAllFromCart,
  removeFromCart,
} from '../../store/food-order.actions';
import { FoodOrderPartialState } from '../../store/food-order.reducer';
import { getCartItems } from '../../store/food-order.selector';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
})
export class CartItemsComponent implements OnInit {
  cartItems$: Observable<MenuItems[]>;
  @Output() closeSideBar = new EventEmitter<boolean>();

  constructor(
    private store: Store<FoodOrderPartialState>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getFoodMenu());
    this.cartItems$ = this.store.select(getCartItems);
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

  removeFromCart(food: MenuItems) {
    this.store.dispatch(removeFromCart({ food }));
    this.openSnackBar({
      message: `${food.name} removed from Cart`,
      icon: 'cancel',
      class: 'red_icon',
    });
  }

  removeAllFromCart() {
    this.store.dispatch(removeAllFromCart());
    this.openSnackBar({
      message: `Removed all items from Cart`,
      icon: 'cancel',
      class: 'red_icon',
    });
  }

  orderFood(food: MenuItems) {
    this.store.dispatch(orderFoodFromCart({ food }));
    this.closeSideBar.emit(true);
    this.router.navigate(['food', 'orders']);
    this.openSnackBar({
      message: `${food.name} ordered`,
      icon: 'check_circle',
      class: 'green_icon',
    });
  }

  orderAllFromCart(cartItems: MenuItems[]) {
    this.store.dispatch(orderAllFromCart({ cartItems }));
    this.closeSideBar.emit(true);
    this.router.navigate(['food', 'orders']);
    this.openSnackBar({
      message: `Ordered all cart items`,
      icon: 'check_circle',
      class: 'green_icon',
    });
  }

  private openSnackBar(data: SnackBarData) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data,
      duration: 3000,
    });
  }
}
