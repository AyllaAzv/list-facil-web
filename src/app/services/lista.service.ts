import { Lista } from './../models/lista';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  baseUrl = 'http://localhost:3000/listas';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  read(usuario_id: string): Observable<Lista[]> {
    const url = `${this.baseUrl}?usuario_id=${usuario_id}`;
    return this.http.get<Lista[]>(url);
  }

  readById(id: any): Observable<Lista> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Lista>(url);
  }

  create(lista: Lista): Observable<Lista> {
    return this.http.post<Lista>(this.baseUrl, lista).pipe(
      map(obj => obj),
      catchError(e => this.errorHandle(e))
    );
  }

  update(lista: Lista): Observable<Lista> {
    const url = `${this.baseUrl}/${lista.id}`;
    return this.http.put<Lista>(url, lista).pipe(
      map(obj => obj),
      catchError(e => this.errorHandle(e))
    );
  }

  delete(id: number): Observable<Lista> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Lista>(url).pipe(
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
