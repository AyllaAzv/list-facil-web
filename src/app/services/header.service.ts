import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  usuario: any = {};

  constructor(
    private localStorageService: LocalStorageService,
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.usuario = this.localStorageService.get("usuario");
    this.usuarioService.get().then((data) => {
      data.subscribe((value) => {
        if (value == null) {
          this.loginService.logout();
          this.localStorageService.remove("usuario");

          this.router.navigate(['/login']);
        }
      });
    });
  }
}
