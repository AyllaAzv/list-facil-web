import { HeaderService } from './../../../services/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuario: any = {};

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    var usuarioLocal = this.headerService.usuario;

    if(usuarioLocal != null) {
      this.usuario = usuarioLocal;
    } 
  }

}
