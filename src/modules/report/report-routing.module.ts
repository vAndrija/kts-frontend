import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../auth/guards/role/role.guard';
import { MealDrinkCostsComponent } from './pages/meal-drink-costs/meal-drink-costs.component';

const routes: Routes = [
   {
    path: "meal-drink-costs",
    pathMatch: "full",
    component: MealDrinkCostsComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: "ROLE_MANAGER"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
