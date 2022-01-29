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
    this.add(100, 100, true, 0, true);
  }

  add(x: number, y: number, value: boolean, id: number, available: boolean) {
    const width = this.settings.blockSnapSize * 6;
    const height = this.settings.blockSnapSize * 3;
    const rectangle = this.newRectangle(x, y, width, height, value, id, available);
    this.layer.add(rectangle);

  }


  newRectangle(x: number, y: number, width: number, height: number, value: boolean, id: number, a: boolean) {
    const group = new Konva.Group({
      x: x,
      y: y,
      width: width,
      height: height,
      draggable: value
    });
    let color = "#964B00";
    if (a === false) {
      color = "#eb6434";
    }
    let t = ""
    if(id !== 0){
      t = id.toString();
    }

    const text = new Konva.Text({
      x: 10,
      y: 15,
      text: t,
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'beige',
      draggable: value,
    });

    const rectangle = new Konva.Rect({
      width: width,
      height: height,
      fill: color,
      stroke: "#ddd",
      strokeWidth: 1,
      shadowColor: "black",
      shadowBlur: 2,
      shadowOffset: { x: 1, y: 1 },
      shadowOpacity: 0.4,
      draggable: value,
      cornerRadius: 10
    });

    group.on("dragend", () => {
      rectangle.draggable(false);
      text.draggable(false);
      group.draggable(false);
      this.selectedItem = group;
      this.table.xCoordinate = this.selectedItem.children[0].getAttr("x") + 100;
      this.table.yCoordinate = this.selectedItem.children[0].getAttr("y") + 100;
      if (value == true) {
        this.createTable();
      }
    });

    if (this.role == 'ROLE_SYSTEM_ADMIN') {
      group.on("click", () => {
        if (this.selectedItem !== null) {
          this.selectedItem.children[1].setAttr("text", this.loadedTables.length + 1);
          this.selectedItem.children[0].setAttr('fill', "#964B00");
        }
        if(rectangle.getAttr("fill") ==="#964B00"){
          rectangle.setAttr("fill", "red");
          this.selectedItem = group;
        }
        
        
      });
    }
    if (this.role == 'ROLE_WAITER') {
      group.on("click", () => {
        this.selectedItem = group;
        this.tableId = this.find(this.selectedItem.getAttr("x"), this.selectedItem.getAttr("y"));
        this.checkIfAvailable();
      });
    }
    group.add(rectangle);
    group.add(text)
    return group;
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
    this.loadedTables.forEach(table => this.check(table.xCoordinate, table.yCoordinate, false, table.id));
  }

  submit(): void {
    this.capacity = this.form.controls['quantity'].value;
    this.closebutton.nativeElement.click();
    this.table.capacity = this.capacity;
    this.addItem();
  }

  check(xCoordinate: number, yCoordinate: number, value: boolean, tableId: number): void {
    this.restaurantTableService.findTableWithOrder(tableId).subscribe(
      (response) => {
        this.add(xCoordinate, yCoordinate, false, tableId, response === null)
      },
    );
  }
  createTable(): void {
    this.restaurantTableService.addRestaurantTable(this.table).subscribe(
      () => {
        this.notificationService.success("Sto je dodat!");
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
      this.selectedItem.children[0].setAttr("fill", "#964B00");
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
            this.selectedItem.children[0].setAttr("fill", "#964B00");
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
