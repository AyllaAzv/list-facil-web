import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-update-foto',
  templateUrl: './dialog-update-foto.component.html',
  styleUrls: ['./dialog-update-foto.component.css']
})
export class DialogUpdateFotoComponent implements OnInit {
  file: any;

  constructor(private usuarioService: UsuarioService, public dialogRef: MatDialogRef<DialogUpdateFotoComponent>) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    this.usuarioService.updateFoto(this.file);
    this.dialogRef.close();
  }
}
