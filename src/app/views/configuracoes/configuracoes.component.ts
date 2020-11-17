import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {
  usuario: any = {};

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    var usuarioLocal = this.headerService.usuario;

    if(usuarioLocal != null) {
      this.usuario = usuarioLocal;
    } 
  }

}
