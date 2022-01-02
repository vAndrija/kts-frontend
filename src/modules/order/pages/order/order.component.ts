import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/modules/menu/services/menu-service/menu.service';
import { MenuItem } from 'src/modules/menu/model/menuItem';
import { Item } from 'src/modules/shared/models/item';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  categories: String[];
  pageSize: number = 3;
  currentPage: number = 0;
  menuItems: MenuItem[] = [];
  category: String = 'Sve';
  orderItems: Item[] = [];
  discount: number = 0;
  $ = (window as any).$;
  searchValue: string ='';

  constructor(private menuService: MenuService) {
    this.categories = ['Sve', 'Supa', 'Doručak', 'Predjelo', 'Glavno jelo', 'Dezert', 'Koktel', 'Topli napitak', 'Bezalkoholno piće'];
  }

  ngOnInit(): void {
    this.getMenuItems();
  }

  open() {
    this.$('.order-create').addClass('active');

  }

  close() {
    this.$('.order-create').removeClass('active');
  }

  loadMore() {
    this.pageSize += 3;
    if (this.category == 'Sve') {
      this.getMenuItems();
    } else if(this.searchValue == '' && this.category != 'Sve') {
      this.getByCategory();
    }
  }

  getMenuItems() {
    this.menuService.getAllMenuItems(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.menuItems = response.body as MenuItem[];
      },
    )
  }

  clickCategory(category: String) {
    this.category = category;
    if (this.category == 'Sve') {
      this.getMenuItems();
    } else {
      this.getByCategory();
    }
  }

  getByCategory() {
    this.menuService.getMenuItemsByCategory(this.currentPage, this.pageSize, this.category).subscribe(
      (response) => {
        this.menuItems = response.body as MenuItem[];
      },
    )
  }

  addOrderItem(createOrderItem: Item) {
    var value = true;
    for(var i = 0; i< this.orderItems.length ;i++){
      if(this.orderItems[i].menuItemId === createOrderItem.menuItemId){
        this.orderItems[i].quantity = this.orderItems[i].quantity + createOrderItem.quantity;
        this.orderItems[i].price = this.orderItems[i].price + createOrderItem.price;
        value = false;
      }
    }
    if(value === true){
      this.orderItems.push(createOrderItem);
    }
    this.discount += createOrderItem.price;
   
  }

  search(f:NgForm){
    this.menuService.searchMenuItems(this.currentPage, this.pageSize, f.value.searchValue).subscribe(
      (response) => {
        this.menuItems = response as MenuItem[];
      },
    )
  }
  
}
