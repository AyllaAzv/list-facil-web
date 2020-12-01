import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = 'http://localhost:3000/usuarios';

  constructor(
    private snackBar: MatSnackBar,
    private afAuth: AngularFireAuth,
    private loginService: LoginService,
    private storage: AngularFireStorage
  ) { }

  async create(usuario: Usuario) {
    var result = await this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.senha);
    result.user.updateProfile({
      displayName: usuario.nome
    });
  }

  async get(): Promise<Observable<any>> {
    return this.afAuth.user;
  }

  updateNome(nome: string) {
    this.afAuth.user.subscribe((u) => {
      u.updateProfile({
        displayName: nome
      }).then(() => {
        this.showMessage("Nome atualizado com sucesso!");
      }).catch(() => {
        this.showMessage("Erro ao atualizar nome!");
      });
    });
  }

  updateSenha(senha: string) {
    this.afAuth.user.subscribe((u) => {
      u.updatePassword(senha).then(() => {
        this.loginService.authenticate(u.email, senha).then((result) => {
          console.log(result);
        }).catch((e) => {
          console.log(e);
        });
        this.showMessage("Senha atualizada com sucesso!");
      }).catch((e) => {
        console.log(e);
      });
    });
  }

  updateFoto(file: any) {
    this.afAuth.user.subscribe((u) => {
      const filePath = `fotos-usuarios/${u.uid}`;
      this.storage.upload(filePath, file).then((data) => {
        data.ref.getDownloadURL().then(url => {
          //ATUALIZA O PERFIL
          u.updateProfile({
            photoURL: url
          }).then(() => {
            this.showMessage("Foto atualizada com sucesso!");
          }).catch(() => {
            this.showMessage("Erro ao atualizar foto!");
          });
        });
      });
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
