import { LoginService } from './../../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DialogComponent } from 'src/app/components/fragments/dialog/dialog.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  form: FormGroup;
  aceitouTermos: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private usuarioService: UsuarioService, 
    private loginService: LoginService,
    private router: Router, 
    private snackBar: MatSnackBar, 
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.criaForm();
  }

  onSubmit() {
    if (this.form.valid && this.aceitouTermos) {
      this.usuarioService.create(this.form.value).then(() => {
        this.showMessage("Conta criada com sucesso!");
        this.router.navigate(['/login']);
      }).catch((e) => {
        console.log(e);
        this.showMessage("Erro ao criar conta!");
      });
    } else if (this.form.valid && !this.aceitouTermos) {
      this.showMessage("Aceite os termos para continuar!");
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
      nome: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  openDialog() {
    this.dialog.open(DialogComponent);
  }
}
