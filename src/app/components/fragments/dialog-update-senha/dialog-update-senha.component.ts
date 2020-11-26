import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dialog-update-senha',
  templateUrl: './dialog-update-senha.component.html',
  styleUrls: ['./dialog-update-senha.component.css']
})
export class DialogUpdateSenhaComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.criaForm();
  }

  onSubmit() {
    if (!this.form.invalid) {
      const senha = this.form.get("senha").value;
      const repetirSenha = this.form.get("repetirSenha").value;

      if(senha == repetirSenha)
        this.usuarioService.updateSenha(senha);
    }
  }

  criaForm() {
    this.form = this.formBuilder.group({
      senha: [null, [Validators.required, Validators.minLength(6)]],
      repetirSenha: [null, [Validators.required, Validators.minLength(6)]],
    });
  }
}
