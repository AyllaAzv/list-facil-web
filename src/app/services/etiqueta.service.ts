import { Etiqueta } from './../models/etiqueta';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {
  baseUrl = 'http://localhost:3000/etiquetas';

  constructor(private http: HttpClient, private snackBar: MatSnackBar,) { }

  read(usuario_id: string): Observable<Etiqueta[]> {
    const url = `${this.baseUrl}?usuario_id=${usuario_id}`;
    return this.http.get<Etiqueta[]>(url);
  }

  readById(id: number): Observable<Etiqueta> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Etiqueta>(url);
  }

  create(etiqueta: Etiqueta): Observable<Etiqueta> {
    return this.http.post<Etiqueta>(this.baseUrl, etiqueta).pipe(
      map(obj => obj),
      catchError(e => this.errorHandle(e))
    );
  }

  errorHandle(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro.');
    return EMPTY;
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
