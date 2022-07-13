import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuItems } from 'src/app/models/food-order.model';
import { FoodOrderState, foodOrderFeatureKey } from './food-order.reducer';

export const getFoodOrderState =
  createFeatureSelector<FoodOrderState>(foodOrderFeatureKey);

export const getAllMenuItems = createSelector(
  getFoodOrderState,
  (state: FoodOrderState) => state.menuItems
);

export const getCartItems = createSelector(
  getFoodOrderState,
  (state: FoodOrderState) => state.menuItems.filter(({ isAdded }) => isAdded)
);

export const cartItemsCount = createSelector(
  getFoodOrderState,
  (state: FoodOrderState) =>
    state.menuItems.filter(({ isAdded }) => isAdded).length
);

export const getOrderedItems = createSelector(
  getFoodOrderState,
  (state: FoodOrderState) => state.orderList
);
