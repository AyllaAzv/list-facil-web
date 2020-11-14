import { HeaderService } from './../../../services/header.service';
import { Categoria } from './../../../models/categoria';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-categoria',
  templateUrl: './dialog-add-categoria.component.html',
  styleUrls: ['./dialog-add-categoria.component.css']
})
export class DialogAddCategoriaComponent implements OnInit {
  form: FormGroup;
  categoria: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private headerService: HeaderService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.criaForm();
  }

  onSubmit() {
    if (!this.form.invalid) {
      this.categoriaService.create(this.form.value).then(() => {
        this.showMessage("Categoria salva com sucesso!")
      }).catch((e) => {
        this.showMessage("Erro ao salvar categoria!")
      });
    }
  }

  criaForm() {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required]],
      usuario_id: this.headerService.usuario.id,
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
