import { UsuarioService } from './../../services/usuario.service';
import { DialogUpdateFotoComponent } from './../../components/fragments/dialog-update-foto/dialog-update-foto.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {
  usuario: any = {};

  constructor(private dialog: MatDialog, private usuarioservice: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioservice.get().then((data) => {
      data.subscribe((value) => {
        this.usuario.nome = value.displayName;
        this.usuario.email = value.email;
        this.usuario.foto = value.photoURL;
      });
    });
  }

  openDialogUpdateFoto() {
    this.dialog.open(DialogUpdateFotoComponent);
  }

}
