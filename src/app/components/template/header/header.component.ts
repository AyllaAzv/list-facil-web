import { Router, NavigationEnd } from '@angular/router';
import { HeaderService } from './../../../services/header.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuario: any = {};
  exibir: boolean = true;

  constructor(
    private headerService: HeaderService,
    private router: Router,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.verificarRota();
    var usuarioLocal = this.headerService.usuario;

    if (usuarioLocal != null) {
      this.usuario = usuarioLocal;
    }

    this.router.events.subscribe((val) => {
      this.verificarRota();
    });
  }

  verificarRota() {
    if (this.router.url.toString() == "/home/config") {
      this.exibir = false;
    } else {
      this.exibir = true;
    }
  }

  onClickLogout() {
    this.loginService.logout().then(() => {
      this.localStorageService.clear();
      this.router.navigate(['/login']);
    })
  }

}
