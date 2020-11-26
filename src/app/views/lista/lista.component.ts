import { Router } from '@angular/router';
import { ListaService } from './../../services/lista.service';
import { Lista } from './../../models/lista';
import { DialogAddEtiquetaComponent } from './../../components/fragments/dialog-add-etiqueta/dialog-add-etiqueta.component';
import { DialogAddCategoriaComponent } from './../../components/fragments/dialog-add-categoria/dialog-add-categoria.component';
import { MatDialog } from '@angular/material/dialog';
import { EtiquetaService } from './../../services/etiqueta.service';
import { HeaderService } from './../../services/header.service';
import { CategoriaService } from './../../services/categoria.service';
import { Item } from './../../models/item';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  form: FormGroup;
  itens: Item[] = [];
  item: Item;
  categorias: any;
  etiquetas: any;

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService, 
    private etiquetaService: EtiquetaService, 
    private listaService: ListaService,
    private headerService: HeaderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.criaForm();
    this.clear();
    this.listaCategorias();
    this.listaEtiquetas();
  }

  onSubmit() {
    if(this.form.valid) {
      var lista: Lista;
      lista = {
        titulo: this.form.get("titulo").value,
        categoria_id: this.form.get("categoria").value,
        etiqueta_id: this.form.get("etiqueta").value,
        data_criacao: new Date().toString(),
        data_ultima_modificacao:  new Date().toString(),
        status: true,
        fixa: false,
        usuario_id: this.headerService.usuario.id,
        itens: this.itens
      }
      
      this.listaService.create(lista).subscribe(lista => {
        console.log(lista);
        this.showMessage("Lista cadastrada com sucesso!");
        this.router.navigate(['/home/listas']);
      });

    } else {
      this.showMessage("Preencha os campos obrigatórios!");
    }
  }

  criaForm() {
    this.form = this.formBuilder.group({
      titulo: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      etiqueta: [null, [Validators.required]]
    });
  }

  listaCategorias() {
    this.categoriaService.read(this.headerService.usuario.id).subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  listaEtiquetas() {
    this.etiquetaService.read(this.headerService.usuario.id).subscribe((etiquetas) => {
      this.etiquetas = etiquetas;
    });
  }

  adicionar(event: any) {
    if (event.key == "Enter") {
      this.itens.push(this.item);
      this.clear();

      event.preventDefault();
    }
  }

  clear() {
    this.item = {
      nome: "",
      comprado: false,
      preco: undefined,
      quantidade: undefined
    }
  }

  openDialogCategoria() {
    this.dialog.open(DialogAddCategoriaComponent);
  }

  openDialogEtiqueta() {
    this.dialog.open(DialogAddEtiquetaComponent);
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
