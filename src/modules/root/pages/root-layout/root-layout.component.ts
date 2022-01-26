import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { WebsocketService } from 'src/modules/shared/services/websocket/websocket.service';

@Component({
  selector: 'app-root-layout',
  templateUrl: './root-layout.component.html',
  styleUrls: ['./root-layout.component.scss']
})
export class RootLayoutComponent implements OnInit {

  
  constructor(private router: Router, private socketService: WebsocketService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (window as any).loadScript();
      }
    })
  }

  ngOnInit(): void {
    const userId = localStorage.getItem("id");
    this.socketService.connect(userId);
  }

  
}
