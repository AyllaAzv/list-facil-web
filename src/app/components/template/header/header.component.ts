import { Router, NavigationEnd } from '@angular/router';
import { HeaderService } from './../../../services/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuario: any = {};
  exibir: boolean = true;

  constructor(private headerService: HeaderService, private router: Router) { }

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

}
