import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './../../services/login.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.criaForm();
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email').value;
      const senha = this.form.get('senha').value;

      this.loginService.authenticate(email, senha).then((result) => {
        this.showMessage("Login efetuado com sucesso!");
        this.router.navigate(['/home/listas']);
      }).catch((e) => {
        this.showMessage("Erro ao fazer login!");
        console.log(e);
      });
    } else {
      this.showMessage("Preencha os campos para continuar!")
    }
  }

  onClickLoginGoogle() {
    this.loginService.authenticateWithGoogle().then((result) => {
      console.log(result);
      this.showMessage("Login efetuado com sucesso!");
      this.router.navigate(['/home/listas']);
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
