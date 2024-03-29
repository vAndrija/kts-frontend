import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { MenuItemDto } from '../../model/menu-item-dto';
import { MenuItemService } from '../../services/menu-item-service/menu-item.service';

@Component({
  selector: 'app-menu-item-form',
  templateUrl: './menu-item-form.component.html',
  styleUrls: ['./menu-item-form.component.scss']
})
export class MenuItemFormComponent {

  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private menuItemService: MenuItemService,
    private notificationService: NotificationService
  ) {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      preparationTime: new FormControl(0, Validators.required),
      category: new FormControl(null, Validators.required),
      type: new FormControl(0, Validators.required)
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error) && this.form.get(control)?.touched;
  }

  public submit(): void {
    const menuItem: MenuItemDto = this.form.value;
    menuItem.imageName = "";

    if (menuItem.category === "Koktel" || menuItem.category === "Topli napitak" || menuItem.category === "Bezalkoholno piće") {
      menuItem.type = 0;
    }
    else {
      menuItem.type = 1;
    }
    this.menuItemService.addMenuItem(menuItem).subscribe(
      (result) => {
        this.notificationService.success("Stavka menija " + result.name + " je kreirana!");
      },
      (error) => {
        if (error.status === 400) {
          this.notificationService.success("Došlo je do greške, pokušajte ponovo.");
        }
      }
    );

  }

}
