import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/modules/shared/services/rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends RestService {

  constructor(http: HttpClient) { 
    super(http);
  }

  getYearlyMealDrinkCosts(year: number): Observable<number[]> {
    return this.http.get<number[]>("api/v1/reports/yearly/" + year + "/meal-drink-costs", {
      headers: this.headers,
      responseType: 'json'
    });
  }

  getMonthlyMealDrinkCosts(year: number, month: number): Observable<number[]> {
    return this.http.get<number[]>("api/v1/reports/" + year + "/monthly/" + month + "/meal-drink-costs", {
      headers: this.headers,
      responseType: 'json'
    });
  }

  getYearlyCostBenefitRatio(year: number): Observable<number[]> {
    return this.http.get<number[]>("api/v1/reports/yearly/" + year + "/cost-benefit-ratio", {
      headers: this.headers,
      responseType: 'json'
    });
  }

  getMonthlyCostBenefitRation(year: number, month: number): Observable<number[]> {
    return this.http.get<number[]>("api/v1/reports/" + year + "/monthly/" + month + "/cost-benefit-ratio", {
      headers: this.headers,
      responseType: 'json'
    });
  }

  getYearlyMealDrinkSalesFor(year: number, menuItemId: string): Observable<number[]> {
    return this.http.get<number[]>("api/v1/reports/yearly/" + year + "/meal-drink-sales/" + menuItemId, {
      headers: this.headers,
      responseType: 'json'
    });
  }

  getMonthlyMealDrinlSalesFor(year: number, month: number, menuItemId: string): Observable<number[]> {
    return this.http.get<number[]>("api/v1/reports/" + year + "/monthly/" + month + "/meal-drink-sales/" + menuItemId, {
      headers: this.headers,
      responseType: 'json'
    });
  }
}
