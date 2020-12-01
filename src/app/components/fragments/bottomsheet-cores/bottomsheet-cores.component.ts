import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottomsheet-cores',
  templateUrl: './bottomsheet-cores.component.html',
  styleUrls: ['./bottomsheet-cores.component.css']
})
export class BottomsheetCoresComponent implements OnInit {
  cores: object[] = [
    {
      nome: "Laranja",
      cor: "#FFF0CB"
    },
    {
      nome: "Verde",
      cor: "#BAF2D8"
    },
    {
      nome: "Vermelho",
      cor: "#F2BAC9"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
