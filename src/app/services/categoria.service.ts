import { Categoria } from './../models/categoria';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  baseUrl = 'http://localhost:3000/categorias';

  constructor(private http: HttpClient, private snackBar: MatSnackBar,) { }

  read(usuario_id: string): Observable<Categoria[]> {
    const url = `${this.baseUrl}?usuario_id=${usuario_id}`;
    return this.http.get<Categoria[]>(url);
  }

  readById(id: number): Observable<Categoria> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Categoria>(url);
  }

  create(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.baseUrl, categoria).pipe(
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
