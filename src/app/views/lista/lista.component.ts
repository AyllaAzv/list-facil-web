import { DialogAddEtiquetaComponent } from './../../components/fragments/dialog-add-etiqueta/dialog-add-etiqueta.component';
import { DialogAddCategoriaComponent } from './../../components/fragments/dialog-add-categoria/dialog-add-categoria.component';
import { MatDialog } from '@angular/material/dialog';
import { EtiquetaService } from './../../services/etiqueta.service';
import { HeaderService } from './../../services/header.service';
import { CategoriaService } from './../../services/categoria.service';
import { Item } from './../../models/item';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  itens: Item[] = [];
  item: Item;
  titulo: String = "";
  itemComprado: boolean = false;
  itemNome: String = "";
  itemValor: number;
  itemQtd: number;
  categorias: any;
  etiquetas: any;

  constructor(
    private categoriaService: CategoriaService, 
    private etiquetaService: EtiquetaService, 
    private headerService: HeaderService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.listaCategorias();
    this.listaEtiquetas();
  }

  listaCategorias() {
    this.categoriaService.findAll(this.headerService.usuario.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.categorias = data;
    });
  }

  listaEtiquetas() {
    this.etiquetaService.findAll(this.headerService.usuario.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.etiquetas = data;
    });
  }

  adicionar(event: any) {
    if (event.key == "Enter") {
      this.item = {
        nome: this.itemNome,
        comprado: this.itemComprado,
        preco: this.itemValor,
        imagem: "",
        quantidade: this.itemQtd
      }

      this.itens.push(this.item);
      this.clear();

      event.preventDefault();
    }
  }

  concluir() {
    console.log(this.itens);
  }

  clear() {

    this.itemNome = "";
    this.itemComprado = false;
    this.itemQtd = 0;
    this.itemValor = 0;

    this.item = {
      nome: this.itemNome,
      comprado: this.itemComprado,
      preco: this.itemValor,
      imagem: "",
      quantidade: this.itemQtd
    }
  }

  openDialogCategoria() {
    this.dialog.open(DialogAddCategoriaComponent);
  }

  openDialogEtiqueta() {
    this.dialog.open(DialogAddEtiquetaComponent);
  }
}
