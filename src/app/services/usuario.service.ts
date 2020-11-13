import { MatSnackBar } from '@angular/material/snack-bar'
import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = 'http://localhost:3000/usuarios';

  constructor(private snackBar: MatSnackBar, private afAuth: AngularFireAuth) { }

  async create(usuario: Usuario) {
    var result = await this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.senha);
    result.user.updateProfile({
      displayName: usuario.nome
    });
  }
}
