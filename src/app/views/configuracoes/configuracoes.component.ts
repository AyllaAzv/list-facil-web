import { DialogUpdateNomeComponent } from './../../components/fragments/dialog-update-nome/dialog-update-nome.component';
import { UsuarioService } from './../../services/usuario.service';
import { DialogUpdateFotoComponent } from './../../components/fragments/dialog-update-foto/dialog-update-foto.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateSenhaComponent } from 'src/app/components/fragments/dialog-update-senha/dialog-update-senha.component';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {
  usuario: any = {};

  constructor(private dialog: MatDialog, private usuarioservice: UsuarioService) { }

  ngOnInit(): void {
    this.initUsuario();
  }

  initUsuario() {
    this.usuarioservice.get().then((data) => {
      data.subscribe((value) => {
        this.usuario.nome = value.displayName;
        this.usuario.email = value.email;
        this.usuario.foto = value.photoURL;
      });
    });
  }

  openDialogUpdateFoto() {
    const dialogRef = this.dialog.open(DialogUpdateFotoComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.initUsuario();
    });
  }

  openDialogUpdateNome() {
    const dialogRef = this.dialog.open(DialogUpdateNomeComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.initUsuario();
    });
  }

  openDialogUpdateSenha() {
    const dialogRef = this.dialog.open(DialogUpdateSenhaComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.initUsuario();
    });
  }

}
