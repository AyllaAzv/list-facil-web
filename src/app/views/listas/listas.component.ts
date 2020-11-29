import { Item } from './../../models/item';
import { ItemService } from './../../services/item.service';
import { Lista } from './../../models/lista';
import { EtiquetaService } from './../../services/etiqueta.service';
import { CategoriaService } from './../../services/categoria.service';
import { HeaderService } from './../../services/header.service';
import { ListaService } from './../../services/lista.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent implements OnInit {
  listas: Lista[] = [];

  constructor(
    private listaService: ListaService, 
    private headerService: HeaderService, 
    private categoriaService: CategoriaService,
    private etiquetaService: EtiquetaService,
    private itemService: ItemService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.listaService.read(this.headerService.usuario.id).subscribe(listas => {
      listas.forEach(l => {
        this.categoriaService.readById(l.categoria_id).subscribe(categoria => {
          l.categoria = categoria;
          this.etiquetaService.readById(l.etiqueta_id).subscribe(etiqueta => {
            l.etiqueta = etiqueta;
            this.itemService.read(l.id).subscribe(itens => {
              l.itens = itens;
              this.listas.push(l);
            });
          });
        });
      });
    });
  }

  onClickNavigateToLista(id: number) {
    this.router.navigate(["/home/lista/" + id]);
  }

  onClickUpdateItemComprado(item: Item, event: any) {
    item.comprado = event.checked;
    this.itemService.update(item).subscribe();
  }

}
