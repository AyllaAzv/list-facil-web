import { Item } from './../../models/item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  itens: Item[] = [];
  item: Item;
  titulo: String = "";
  itemComprado: boolean = false;
  itemNome: String = "";
  itemValor: number;
  itemQtd: number;

  constructor() { }

  ngOnInit(): void {
  }

  adicionar(event: any) {
    if (event.key == "Enter") {
      this.item = {
        nome: this.itemNome,
        comprado: this.itemComprado,
        preco: this.itemValor,
        imagem: "",
        quantidade:  this.itemQtd
      }

      this.itens.push(this.item);
      this.clear();

      event.preventDefault();
    }
  }

  concluir() {
    console.log(this.itens);
  }

  clear() {

    this.itemNome = "";
    this.itemComprado = false;
    this.itemQtd = 0;
    this.itemValor = 0;

    this.item = {
      nome: this.itemNome,
      comprado: this.itemComprado,
      preco: this.itemValor,
      imagem: "",
      quantidade: this.itemQtd
    }
  }
}
