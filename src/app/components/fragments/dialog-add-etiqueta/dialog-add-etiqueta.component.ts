import { EtiquetaService } from './../../../services/etiqueta.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from 'src/app/services/header.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-etiqueta',
  templateUrl: './dialog-add-etiqueta.component.html',
  styleUrls: ['./dialog-add-etiqueta.component.css']
})
export class DialogAddEtiquetaComponent implements OnInit {
  form: FormGroup;
  etiqueta: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private etiquetaService: EtiquetaService,
    private headerService: HeaderService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogAddEtiquetaComponent>
  ) { }

  ngOnInit(): void {
    this.criaForm();
  }

  onSubmit() {
    if (!this.form.invalid) {
      this.etiquetaService.create(this.form.value).subscribe((etiqueta) => {
        console.log(etiqueta);
        this.showMessage("Etiqueta salva com sucesso!");
        this.dialogRef.close();
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
