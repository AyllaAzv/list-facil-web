import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'http://localhost:3000/usuarios';

  constructor(private afAuth: AngularFireAuth) { }


  async authenticate(email: string, senha: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, senha);
    return result;
  }

  async authenticateWithGoogle() {
    var result = await this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
    return result;
  }
}
