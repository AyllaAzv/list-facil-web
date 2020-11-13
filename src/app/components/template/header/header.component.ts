import { SessionStorageService } from './../../../services/session-storage.service';
import { LocalStorageService } from './../../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuario: any = {};

  constructor(private localStorageService: LocalStorageService, private sesseionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    var userLocal = this.localStorageService.get("usuario");
    var userSession = this.sesseionStorageService.get("usuario");

    if(userLocal != null) {
      this.usuario = userLocal;
    } else if(userSession != null) {
      this.usuario = userSession;
    }
  }

}
