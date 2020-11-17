import { Etiqueta } from './../models/etiqueta';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {

  constructor(private firestore: AngularFirestore) { }

  findAll(usuario_id: string): AngularFirestoreCollection<Etiqueta> {
    return this.firestore.collection("etiquetas", ref => ref.where('usuario_id', '==', usuario_id));
  }

  async create(etiqueta: Etiqueta) {
    return await this.firestore.collection("etiquetas").add({ ...etiqueta });
  }
}
