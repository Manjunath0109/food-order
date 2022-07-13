import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodCardComponent } from './components/food-card/food-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import {
  foodOrderFeatureKey,
  foodOrderReducer,
} from './store/food-order.reducer';
import { MatIconModule } from '@angular/material/icon';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { CategoryFilterPipe } from './pipes/category-filter.pipe';

const routes: Routes = [
  {
    path: 'menu',
    component: FoodCardComponent,
  },
  {
    path: 'orders',
    component: OrderListComponent,
  },
];

@NgModule({
  declarations: [
    FoodCardComponent,
    CartItemsComponent,
    OrderListComponent,
    SnackbarComponent,
    CategoryFilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(foodOrderFeatureKey, foodOrderReducer),
  ],
  exports: [FoodCardComponent, CartItemsComponent],
})
export class MenuModule {}
