import { Injectable } from '@angular/core';
import { Message } from '../../models/message';
import { Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { NotificationService } from '../notification/notification.service';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private stompClient: any;
  initialized: boolean = false;


  constructor(private notificationService: NotificationService) {}

  connect(userId: any): void {
    if(this.initialized) {
      return;
    }
    this.initialized = true;
 
    const socket = new SockJS('http://localhost:8081/socket');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame: string) {
      _this.initialized = true;
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/socket-publisher', function (message: {body: any}) {
        _this.showMessage(message);
      });

      _this.subscribeToLocalSocket(userId);
    });
  }

  disconnect(): void {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.initialized = false;
    console.log('Disconnected!');
  }

  subscribeToLocalSocket(userId: any): void {
    this.stompClient.subscribe("/socket-publisher/" + userId, (message: { body: string; }) => {
      this.showMessage(message);
    });
  }

  sendOrderItemStatusChangedMessage(message: any): void {
    this.stompClient.send(
      '/socket-subscriber/send/orderItemStatus', {}, JSON.stringify(message));
  }

  sendOrderCreatedMessage(message: any): void {
    this.stompClient.send(
      '/socket-subscriber/send/order', {}, JSON.stringify(message));
  }

  showMessage(message: { body: any; }): void {
    const messageResult: Message = JSON.parse(message.body);
    this.notificationService.websocketSuccess(messageResult.message);
  }

 
}
