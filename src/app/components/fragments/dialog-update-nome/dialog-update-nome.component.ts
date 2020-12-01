import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-update-nome',
  templateUrl: './dialog-update-nome.component.html',
  styleUrls: ['./dialog-update-nome.component.css']
})
export class DialogUpdateNomeComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<DialogUpdateNomeComponent>
    ) { }

  ngOnInit(): void {
    this.criaForm();
  }

  onSubmit() {
    if (!this.form.invalid) {
      this.usuarioService.updateNome(this.form.get("nome").value);
      this.dialogRef.close();
    }
  }

  criaForm() {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required]],
    });
  }

}
