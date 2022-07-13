import { createReducer, on } from '@ngrx/store';
import * as FoodorderActions from './food-order.actions';
import { MenuItems, OrderList } from 'src/app/models/food-order.model';
import { mockMenuItems } from 'src/assets/menu';
import { orderList } from 'src/assets/order_list';

export const foodOrderFeatureKey = 'food-order';

export interface FoodOrderState {
  isloaded: boolean;
  menuItems?: Array<MenuItems>;
  orderList?: Array<OrderList>;
}
export interface FoodOrderPartialState {
  readonly [foodOrderFeatureKey]: FoodOrderState;
}

export const foodOrderInitialState: FoodOrderState = {
  isloaded: false,
};

export const foodOrderReducer = createReducer(
  foodOrderInitialState,

  on(FoodorderActions.getFoodMenu, (state) => ({
    ...state,
    isloaded: false,
    menuItems: mockMenuItems.items.map((item) => ({ ...item, quantity: 0 })),
  })),
  on(FoodorderActions.getFoodMenuSuccess, (state, { foodList }) => ({
    ...state,
    isloaded: true,
    foodList,
  })),
  on(FoodorderActions.getFoodMenuFailure, (state) => ({
    ...state,
    isloaded: true,
  })),
  on(
    FoodorderActions.changeQuantity,
    (state, { id, isIncremented, value }) => ({
      ...state,
      menuItems: state.menuItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: value
                ? value
                : isIncremented
                ? item.quantity + 1
                : item.quantity - 1,
            }
          : item
      ),
    })
  ),
  on(FoodorderActions.addToCart, (state, { food }) => ({
    ...state,
    menuItems: state.menuItems.map((item) =>
      item.id === food.id ? { ...item, isAdded: true } : item
    ),
  })),
  on(FoodorderActions.removeFromCart, (state, { food }) => ({
    ...state,
    menuItems: state.menuItems.map((item) =>
      item.id === food.id ? { ...item, isAdded: false, quantity: 0 } : item
    ),
  })),
  on(FoodorderActions.removeAllFromCart, (state) => ({
    ...state,
    menuItems: state.menuItems.map((item) =>
      item.isAdded ? { ...item, isAdded: false, quantity: 0 } : item
    ),
  })),
  on(FoodorderActions.orderFoodFromCart, (state, { food }) => ({
    ...state,
    menuItems: state.menuItems.map((item) =>
      item.id === food.id ? { ...item, isAdded: false, quantity: 0 } : item
    ),
    orderList: state.orderList
      ? [
          ...state.orderList,
          {
            ...food,
            orderDate: new Date().toLocaleDateString(),
            orderTime: new Date().toLocaleTimeString(),
          },
        ]
      : [
          ...orderList,
          {
            ...food,
            orderDate: new Date().toLocaleDateString(),
            orderTime: new Date().toLocaleTimeString(),
          },
        ],
  })),
  on(FoodorderActions.orderAllFromCart, (state, { cartItems }) => ({
    ...state,
    menuItems: state.menuItems.map((item) =>
      item.isAdded ? { ...item, isAdded: false, quantity: 0 } : item
    ),
    orderList: state.orderList
      ? [
          ...state.orderList,
          ...cartItems.map((food) => ({
            ...food,
            orderDate: new Date().toLocaleDateString(),
            orderTime: new Date().toLocaleTimeString(),
          })),
        ]
      : [
          ...orderList,
          ...cartItems.map((food) => ({
            ...food,
            orderDate: new Date().toLocaleDateString(),
            orderTime: new Date().toLocaleTimeString(),
          })),
        ],
  })),
  on(FoodorderActions.getOrderList, (state) => ({
    ...state,
    orderList: state.orderList || orderList,
  })),
  on(FoodorderActions.deleteOrder, (state, { id }) => ({
    ...state,
    orderList: state.orderList.filter((order) => order.id !== id),
  }))
);
