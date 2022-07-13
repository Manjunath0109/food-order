import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { FoodOrderPartialState } from '../../store/food-order.reducer';
import { FormControl } from '@angular/forms';
import { getOrderList, deleteOrder } from '../../store/food-order.actions';
import { getOrderedItems } from '../../store/food-order.selector';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { OrderList } from 'src/app/models/food-order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = [
    'id',
    'name',
    'type',
    'cuisine',
    'quantity',
    'price',
    'orderDate',
    'delete',
  ];
  dataSource = new MatTableDataSource<any>();
  orderList$ = this.store.select(getOrderedItems);
  showBestSeller = false;
  type = new FormControl([]);
  foodTypes = ['Veg', 'Non-Veg'];
  cuisine = new FormControl([]);
  cuisineTypes = ['South Indian', 'North Indian'];
  filtersArr = [
    { placeHolder: 'Type', filterForm: this.type, values: this.foodTypes },
    {
      placeHolder: 'Cuisine',
      filterForm: this.cuisine,
      values: this.cuisineTypes,
    },
  ];

  constructor(
    private store: Store<FoodOrderPartialState>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.store.dispatch(getOrderList());
    this.orderList$.subscribe((orders) => {
      this.dataSource.data = orders;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(target: any) {
    this.dataSource.filter = target.value.trim().toLocaleLowerCase();
  }

  deleteOrder(order: OrderList) {
    this.store.dispatch(deleteOrder({ id: order.id }));
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: `${order.name} order deleted from list`,
        icon: 'cancel',
        class: 'red_icon',
      },
      duration: 3000,
    });
  }

  applyFilters() {
    this.orderList$.subscribe((orders) => {
      this.dataSource.data = orders
        .filter((order) => {
          if (!this.type.value.length && !this.cuisine.value.length) {
            return order;
          }
          if (this.type.value.length && this.cuisine.value.length) {
            if (
              this.type.value.includes(order.type) &&
              this.cuisine.value.includes(order.cuisine)
            ) {
              return order;
            }
            return;
          }
          if (this.type.value.length && this.type.value.includes(order.type)) {
            return order;
          }
          if (
            this.cuisine.value.length &&
            this.cuisine.value.includes(order.cuisine)
          ) {
            return order;
          }
        })
        .filter((order) => {
          if (this.showBestSeller) {
            if (this.showBestSeller === order.bestSeller) {
              return order;
            }
            return;
          }
          return order;
        });
    });
  }

  showBestSellingFood() {
    this.showBestSeller = !this.showBestSeller;
    this.applyFilters();
  }
}
