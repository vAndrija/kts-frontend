import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/modules/menu/model/menuItem';
import { Item } from 'src/modules/shared/models/item';
import { NgForm } from '@angular/forms';
import { MenuService } from 'src/modules/menu/services/menu-service/menu.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  categories: String[];
  pageSize: number = 3;
  totalPages: number = 0;
  currentPage: number = 0;
  menuItems: MenuItem[] = [];
  category: String = 'Sve';
  orderItems: Item[] = [];
  discount: number = 0;
  $ = (window as any).$;
  searchValue: string = '';
  quantityMap = new Map();
  routeState: any;
  tableId: number = 0;
  constructor(private menuService: MenuService, private router: Router) {
    this.categories = ['Sve', 'Supa', 'Doručak', 'Predjelo', 'Glavno jelo', 'Dezert', 'Koktel', 'Topli napitak', 'Bezalkoholno piće'];
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.routeState = this.router.getCurrentNavigation()?.extras.state;
      if (this.routeState) {
        this.tableId = this.routeState.tableId;
      }
    }

  }

  ngOnInit(): void {
    this.getMenuItems();
  }

  open(): void {
    this.$('.order-create').addClass('active');

  }

  close(): void {
    this.$('.order-create').removeClass('active');
  }

  loadMore(): void {
    this.pageSize += 3;
    if (this.category == 'Sve') {
      this.getMenuItems();
    } else if (this.searchValue == '' && this.category != 'Sve') {
      this.getByCategory();
    }
  }

  getMenuItems(): void {
    this.menuService.getAllMenuItems(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.menuItems = response.body["content"] as MenuItem[];
        this.totalPages = response.body["totalPages"] as number;
      },
    )
  }

  clickCategory(category: String): void {
    this.category = category;
    if (this.category == 'Sve') {
      this.getMenuItems();
    } else {
      this.getByCategory();
    }
  }

  getByCategory(): void {
    this.menuService.getMenuItemsByCategory(this.currentPage, this.pageSize, this.category).subscribe(
      (response) => {
        this.menuItems = response.body["content"] as MenuItem[];
        this.totalPages = response.body["totalPages"] as number;
      },
    )
  }

  check(id: string, quantity: number): boolean {
    var value = true;
    if (this.quantityMap.has(id)) {
      this.quantityMap.set(id, this.quantityMap.get(id) + quantity);
      value = false;
    } else {
      this.quantityMap.set(id, quantity);
    }
    return value;
  }

  addOrderItem(createOrderItem: Item): void {
    var quantity = createOrderItem.quantity;
    if (this.check(createOrderItem.menuItemId, createOrderItem.quantity) === true) {
      this.orderItems.push(createOrderItem);
      this.discount += createOrderItem.discount;
    } else {
      createOrderItem.quantity = this.quantityMap.get(createOrderItem.menuItemId);
      createOrderItem.discount = createOrderItem.price * createOrderItem.quantity;
      this.discount += createOrderItem.price * quantity;
    }

  }

  search(f: NgForm): void {
    this.menuService.searchMenuItems(f.value.searchValue).subscribe(
      (response) => {
        this.totalPages = 1;
        this.menuItems = response as MenuItem[];
      },
    )
  }

  onDelete(items: Item[]): void {
    this.orderItems = items;
  }

}
