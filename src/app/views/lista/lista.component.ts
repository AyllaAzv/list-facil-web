import { BottomsheetCoresComponent } from './../../components/fragments/bottomsheet-cores/bottomsheet-cores.component';
import { ItemService } from './../../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  form: FormGroup;
  itens: Item[] = [];
  itensRemovidos: Item[] = [];
  item: Item;
  categorias: any;
  etiquetas: any;
  id: any;
  total: number = 0.0;
  lista: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private etiquetaService: EtiquetaService,
    private listaService: ListaService,
    private itemService: ItemService,
    private headerService: HeaderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.criaForm();
    this.clear();
    this.listaCategorias();
    this.listaEtiquetas();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id != null) {
      this.listaService.readById(this.id).subscribe(lista => {
        this.lista = lista;
        this.form.patchValue({
          titulo: lista.titulo,
          categoria: lista.categoria_id,
          etiqueta: lista.etiqueta_id
        });
        this.itemService.read(lista.id).subscribe(itens => {
          this.itens = itens;
          this.calculaTotal();
        })
      });
    }

  }

  onSubmit() {
    console.log(this.lista.cor)
    if (this.form.valid) {
      this.lista = {
        id: this.id != null ? this.id : null,
        titulo: this.form.get("titulo").value,
        categoria_id: this.form.get("categoria").value,
        etiqueta_id: this.form.get("etiqueta").value,
        data_criacao: this.id != null ? this.lista.data_criacao : new Date().toString(),
        data_ultima_modificacao: new Date().toString(),
        cor: this.lista.cor != null ? this.lista.cor : "#FFF0CB",
        status: true,
        fixa: false,
        usuario_id: this.headerService.usuario.id
      }

      this.deletarItensRemovidos();

      if (this.id == null)
        this.create(this.lista);
      else
        this.update(this.lista)

    } else {
      this.showMessage("Preencha os campos obrigatórios!");
    }
  }

  create(lista: Lista) {
    this.listaService.create(lista).subscribe((l) => {
      this.itens.forEach(i => {
        i.lista_id = l.id;
        this.itemService.create(i).subscribe();
      });
      this.showMessage("Lista cadastrada com sucesso!");
      this.router.navigate(['/home/listas']);
    });
  }

  update(lista: Lista) {
    this.listaService.update(lista).subscribe(() => {
      this.itens.forEach(i => {
        if (i.id == null) {
          i.lista_id = lista.id;
          this.itemService.create(i).subscribe();
        }
        else
          this.itemService.update(i).subscribe();
      });
      this.showMessage("Lista atualizada com sucesso!");
      this.router.navigate(['/home/listas']);
    });
  }

  onClickDelete() {
    this.listaService.delete(this.id).subscribe(() => {
      this.itens.forEach(i => {
        if (i.id != null) {
          this.itemService.delete(i.id).subscribe();
        }
      });
      this.showMessage("Lista deletada com sucesso!");
      this.router.navigate(['/home/listas']);
    });
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
      this.calculaTotal();

      event.preventDefault();
    }
  }

  remover(item: Item) {
    this.itens = this.itens.filter(obj => obj !== item);
    this.itensRemovidos.push(item);
    this.calculaTotal();
  }

  deletarItensRemovidos() {
    this.itensRemovidos.forEach(i => {
      this.itemService.delete(i.id).subscribe();
    });
  }

  calculaTotal() {
    this.total = 0;
    this.itens.forEach(i => {
      this.total += (i.preco * i.quantidade);
    });
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
    const dialogRef = this.dialog.open(DialogAddCategoriaComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.listaCategorias();
    });
  }

  openDialogEtiqueta() {
    const dialogRef = this.dialog.open(DialogAddEtiquetaComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.listaEtiquetas();
    });
  }

  openBottomSheet(): void {
    if(this.lista.cor == undefined) 
      this.lista.cor = "#FFF0CB";

    const bottomShetRef = this.bottomSheet.open(BottomsheetCoresComponent, {
      data: {
        cor: this.lista.cor
      }
    });

    bottomShetRef.afterDismissed().subscribe(result => {
      this.lista.cor = result;
    });
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
