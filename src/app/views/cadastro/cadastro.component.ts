import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  form: FormGroup;
  aceitouTermos: boolean = false;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.criaForm();
  }

  onSubmit() {
    if (this.form.valid && this.aceitouTermos) {
      this.usuarioService.create(this.form.value).subscribe(() => {
        this.showMessage("Conta criada com sucesso!");
        this.router.navigate(['/login']);
      });
    } else if(!this.aceitouTermos) {
      this.showMessage("Aceite os termos para continuar", true);
    }
  }

  criaForm() {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(6)]]
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
