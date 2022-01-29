import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../auth/guards/role/role.guard';
import { CostBenefitRatioComponent } from './pages/cost-benefit-ratio/cost-benefit-ratio.component';
import { MealDrinkCostsComponent } from './pages/meal-drink-costs/meal-drink-costs.component';
import { MealDrinkSalesComponent } from './pages/meal-drink-sales/meal-drink-sales.component';
import { PreparingTimeReportComponent } from './pages/preparing-time-report/preparing-time-report.component';

const routes: Routes = [
   {
    path: "meal-drink-costs",
    pathMatch: "full",
    component: MealDrinkCostsComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ROLE_MANAGER" }
  },
  {
    path: "cost-benefit-ratio",
    pathMatch: "full",
    component: CostBenefitRatioComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ROLE_MANAGER" }
  },
  {
    path: "meal-drink-sales",
    pathMatch: "full",
    component: MealDrinkSalesComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ROLE_MANAGER" }
  },
  {
    path: "preparing-time",
    pathMatch: "full",
    component: PreparingTimeReportComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ROLE_MANAGER" }
  },
  { path: "**", redirectTo: "meal-drink-costs" }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
