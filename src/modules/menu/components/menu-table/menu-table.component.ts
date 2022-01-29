import { Component, OnInit } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Menu } from '../../model/menu';
import { MenuService } from '../../services/menu-service/menu.service';

@Component({
  selector: 'app-menu-table',
  templateUrl: './menu-table.component.html',
  styleUrls: ['./menu-table.component.scss']
})
export class MenuTableComponent implements OnInit {

  menus: Menu[] = [];
  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.loadAllMenus();
  }

  loadAllMenus(): void {
    this.menuService.getMenus().subscribe(
      (result) => {
        this.menus = result as Menu[];
      }
    );
  }
}
