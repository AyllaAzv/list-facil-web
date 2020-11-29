import { HttpClient } from '@angular/common/http';
import { Item } from './../models/item';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseUrl = 'http://localhost:3000/itens';

  constructor(private http: HttpClient) { }

  read(lista_id: number): Observable<Item[]> {
    const url = `${this.baseUrl}?lista_id=${lista_id}`;
    return this.http.get<Item[]>(url);
  }

  readById(id: number): Observable<Item> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Item>(url);
  }

  create(item: Item): Observable<Item> {
    return this.http.post<Item>(this.baseUrl, item).pipe(
      map(obj => obj),
    );
  }

  update(item: Item): Observable<Item> {
    const url = `${this.baseUrl}/${item.id}`;
    return this.http.put<Item>(url, item).pipe(
      map(obj => obj),
    );
  }

  delete(id: number): Observable<Item> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Item>(url).pipe(
      map(obj => obj),
    );
  }
}
