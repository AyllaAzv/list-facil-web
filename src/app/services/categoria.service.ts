import { Categoria } from './../models/categoria';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private firestore: AngularFirestore) { }

  findAll(usuario_id: string): AngularFirestoreCollection<Categoria> {
    return this.firestore.collection("categorias", ref => ref.where('usuario_id', '==', usuario_id));
  }

  async create(categoria: Categoria) {
    return await this.firestore.collection("categorias").add({ ...categoria });
  }
}
