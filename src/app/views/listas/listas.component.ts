import { EtiquetaService } from './../../services/etiqueta.service';
import { CategoriaService } from './../../services/categoria.service';
import { HeaderService } from './../../services/header.service';
import { ListaService } from './../../services/lista.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent implements OnInit {
  listas: any[] = [];

  constructor(
    private listaService: ListaService, 
    private headerService: HeaderService, 
    private categoriaService: CategoriaService,
    private etiquetaService: EtiquetaService
    ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.listaService.read(this.headerService.usuario.id).subscribe(listas => {
      listas.forEach(l => {
        this.categoriaService.readById(l.categoria_id).subscribe(categoria => {
          l.categoria = categoria;
        });
        this.etiquetaService.readById(l.etiqueta_id).subscribe(etiqueta => {
          l.etiqueta = etiqueta;
        });
        this.listas.push(l);
      });
    });
  }

}
