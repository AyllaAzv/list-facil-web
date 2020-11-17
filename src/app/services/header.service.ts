import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  usuario: any = {};

  constructor(private localStorageService: LocalStorageService) {
    this.usuario = this.localStorageService.get("usuario");
  }
}
