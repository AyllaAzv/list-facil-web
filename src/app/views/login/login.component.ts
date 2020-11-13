import { Usuario } from './../../models/usuario';
import { SessionStorageService } from './../../services/session-storage.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  lembrar: boolean = false;
  usuario: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
    var userLocal = this.localStorageService.get("usuario");
    var userSession = this.sessionStorageService.get("usuario");

    if (userLocal != null || userSession != null) {
      this.router.navigate(['/home/listas']);
    }
    this.criaForm();
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email').value;
      const senha = this.form.get('senha').value;

      this.loginService.authenticate(email, senha).then((result) => {
        this.showMessage("Login efetuado com sucesso!");

        this.usuario.id = result.user.uid;
        this.usuario.nome = result.user.displayName;
        this.usuario.email = result.user.email;
        this.usuario.foto = result.user.photoURL;

        this.localStorageService.clear();
        this.sessionStorageService.clear();

        if (this.lembrar) {
          this.localStorageService.set("usuario", this.usuario);
        } else {
          this.sessionStorageService.set("usuario", this.usuario);
        }

        this.router.navigate(['/home/listas']);
      }).catch((e) => {
        if (e.code == "auth/invalid-email") {
          this.showMessage("E-mail inválido!")
        }
        else if (e.code == "auth/wrong-password") {
          this.showMessage("E-mail ou senha inválidos!");
        }
        else {
          this.showMessage("Ocorreu um erro!");
          console.log(e);
        }
      });
    } else {
      this.showMessage("Preencha os campos para continuar!")
    }
  }

  onClickLoginGoogle() {
    this.loginService.authenticateWithGoogle().then((result) => {
      this.usuario.id = result.user.uid;
      this.usuario.nome = result.user.displayName;
      this.usuario.email = result.user.email;
      this.usuario.foto = result.user.photoURL;

      this.localStorageService.clear();

      this.localStorageService.set("usuario", this.usuario);

      this.showMessage("Login efetuado com sucesso!");
      this.router.navigate(['/home/listas']);
    }).catch((e) => {
      console.log(e);
      this.showMessage("Ocorreu um erro!");
    });
  }

  criaForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      senha: [null, [Validators.required]]
    });
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

}
