import { createAction, props } from '@ngrx/store';
import { MenuItems } from 'src/app/models/food-order.model';

export const getFoodMenu = createAction('[Food Order] Get List of Food items');

export const getFoodMenuSuccess = createAction(
  '[Food Order] Get List of Food items Success',
  props<{ foodList: Array<any> }>()
);

export const getFoodMenuFailure = createAction(
  '[Food Order] Get List of Food items Failure'
);

export const changeQuantity = createAction(
  '[Food Order] Change Food Quantity',
  props<{ id: string; isIncremented: boolean; value: number }>()
);

export const addToCart = createAction(
  '[Food Order] Add Food to Cart',
  props<{ food: MenuItems }>()
);

export const removeFromCart = createAction(
  '[Food Order] Remove Food to Cart',
  props<{ food: MenuItems }>()
);

export const removeAllFromCart = createAction(
  '[Food Order] Remove All Food to Cart'
);

export const orderFoodFromCart = createAction(
  '[Food Order] Order Food From Cart',
  props<{ food: MenuItems }>()
);

export const orderAllFromCart = createAction(
  '[Food Order] Order All Food to Cart',
  props<{ cartItems: MenuItems[] }>()
);

export const getOrderList = createAction(
  '[Food Order] Get List of Ordered items'
);

export const deleteOrder = createAction(
  '[Food Order] Delete order from List',
  props<{ id: string }>()
);
