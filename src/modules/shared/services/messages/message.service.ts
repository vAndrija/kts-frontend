import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationDto, Notification } from '../../models/notification';
import { RestService } from '../rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends RestService{

  constructor(http: HttpClient) {
    super(http);
  }

  addNewNotification(notification: NotificationDto): Observable<Notification> {
    return this.http.post<Notification>("api/v1/notifications", notification, {
      headers: this.headers,
      responseType: "json"
    });
  }

  getWaiterNotification(waiterId: any) {
    return this.http.get<Notification[]>("api/v1/notifications/waiter/" + waiterId.toString(), {
      headers: this.headers,
      responseType: "json"
    });
  }

  getCookAndBartemderNotification() {
    return this.http.get<Notification[]>("api/v1/notifications/bartender-cook/", {
      headers: this.headers,
      responseType: "json"
    });
  }

  deleteNotification(orderItemId: number) {
    return this.http.delete<void>("api/v1/notifications/" + orderItemId.toString(), {
      headers: this.headers,
      responseType: "json"
    })
  }

}
