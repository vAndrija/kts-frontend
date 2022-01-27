import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BrowserModule } from '@angular/platform-browser'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RootLayoutComponent } from './pages/root-layout/root-layout.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { InterceptorInterceptor } from "../shared/interceptors/interceptor.interceptor";
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { OrderModule } from '../order/order.module';
import { WebsocketService } from '../shared/services/websocket/websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    RootLayoutComponent,
    NotFoundPageComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass :'toast-top-center'
    }),
    OrderModule,
    SharedModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true }, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
