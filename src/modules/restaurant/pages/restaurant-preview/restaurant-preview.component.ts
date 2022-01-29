import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { RestaurantTable } from 'src/modules/shared/models/restaurant-table';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { RestaurantTableService } from '../../services/restaurant-table.service';

@Component({
  selector: 'app-restaurant-preview',
  templateUrl: './restaurant-preview.component.html',
  styleUrls: ['./restaurant-preview.component.scss']
})
export class RestaurantPreviewComponent implements OnInit {

  @ViewChild('closebutton') closebutton: any;
  @ViewChild('close') close: any;
  form: FormGroup;
  stage!: Stage;
  layer!: Layer;
  settings = {
    containerSizeX: 1150,
    containerSizeY: 520,
    blockSnapSize: 20,
    draggable: false,
  };
  selectedItem: any;
  tables: any[] = [];
  loadedTables: RestaurantTable[] = [];
  role: string = '';
  capacity: number = 0;
  table: RestaurantTable = {
    id: 0,
    tableNumber: 0,
    xCoordinate: 0,
    yCoordinate: 0,
    capacity: 0
  };
  tableId: number = 0;
  constructor(private restaurantTableService: RestaurantTableService, private notificationService: NotificationService,
    private router: Router) {
    this.form = new FormGroup({
      quantity: new FormControl(1, Validators.required)
    })
  }

  ngOnInit(): void {
    const role = localStorage.getItem("role");
    if (role) {
      this.role = role;
    }
    this.selectedItem = null;
    this.stage = this.makeContainer();
    this.layer = new Konva.Layer({ id: "layer" });
    this.stage.add(this.layer);
    this.load();

  }

  makeContainer(): Stage {
    return new Konva.Stage({
      container: "container",
      width: this.settings.containerSizeX,
      height: this.settings.containerSizeY,
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      draggable: this.settings.draggable,

    });
  }
  addItem(): void {
    this.add(100, 100, true);
  }

  add(x: number, y: number, value: boolean) {
    const width = this.settings.blockSnapSize * 6;
    const height = this.settings.blockSnapSize * 3;
    const rectangle = this.newRectangle(x, y, width, height, value);
    this.layer.add(rectangle);

  }


  newRectangle(x: number, y: number, width: number, height: number, value: boolean) {
    const rectangle = new Konva.Rect({
      x: x,
      y: y,
      width: width,
      height: height,
      fill: "#964B00",
      stroke: "#ddd",
      strokeWidth: 1,
      shadowColor: "black",
      shadowBlur: 2,
      shadowOffset: { x: 1, y: 1 },
      shadowOpacity: 0.4,
      draggable: value,
      cornerRadius: 10
    });
   
    rectangle.on("dragend", () => {
      rectangle.draggable(false);
      this.selectedItem = rectangle;
      this.table.xCoordinate = rectangle.getAttr("x");
      this.table.yCoordinate = rectangle.getAttr("y");
      if (value == true) {
        this.createTable();
      }
    });

    if (this.role == 'ROLE_SYSTEM_ADMIN') {
      rectangle.on("click", () => {
        rectangle.setAttr("fill", "red");
        this.selectedItem = rectangle;
      });
    }
    if (this.role == 'ROLE_WAITER') {
      rectangle.on("click", () => {
        this.selectedItem = rectangle;
        this.tableId = this.find(this.selectedItem.getAttr("x"), this.selectedItem.getAttr("y"));
        this.checkIfAvailable();
      });
    }
    return rectangle;
  }

  load(): void {
    this.restaurantTableService
      .getRestaurantTables()
      .subscribe((res) => {
        this.loadedTables = res as RestaurantTable[];
        this.layout();
      });
  }

  layout(): void {
    this.loadedTables.forEach(table => this.add(table.xCoordinate, table.yCoordinate, false));
  }

  submit(): void {
    this.capacity = this.form.controls['quantity'].value;
    this.closebutton.nativeElement.click();
    this.table.capacity = this.capacity;
    this.addItem();
  }

  createTable(): void {
    this.restaurantTableService.addRestaurantTable(this.table).subscribe(
      () => {
        this.notificationService.success("Sto je dodat!");
        this.load();
      },
      (error) => {
        if (error.status === 400) {
          this.notificationService.error("Došlo je do greške, pokušajte ponovo.");
          this.selectedItem.destroy();
        }
      }
    );
  }

  find(xCoordinate: number, yCoordinate: number): number {
    for (let i = 0; i < this.loadedTables.length; i++) {
      if (this.loadedTables[i].xCoordinate === xCoordinate && this.loadedTables[i].yCoordinate === yCoordinate) {
        return this.loadedTables[i].id;
      }
    }
    return 0;
  }

  delete(value: string): void {
    if (value === 'ne') {
      this.selectedItem.setAttr("fill", "#964B00");
      this.close.nativeElement.click();
    } else {
      const id = this.find(this.selectedItem.getAttr("x"), this.selectedItem.getAttr("y"));
      this.close.nativeElement.click();
      this.restaurantTableService.findTableWithOrder(id).subscribe(
        (response) => {
          if (response === null) {
            this.restaurantTableService.deleteRestaurantTable(id).subscribe(
              () => {
                this.notificationService.success("Sto je obrisan!");
                this.selectedItem.destroy();
                this.load();
              });

          } else {
            this.notificationService.error("Nije moguće obrisati sto!");
          }
        },
      );


    }
  }

  checkIfAvailable(): void {
    this.restaurantTableService.findTableWithOrder(this.tableId).subscribe(
      (response) => {
        if (response === null) {
          this.router.navigate(['/order/order'], { state: { tableId: this.tableId } });
        } else {
          this.router.navigate(['/order/review'], { state: { orders: response, tableId: this.tableId } });
        }
      },
    );
  }
}
