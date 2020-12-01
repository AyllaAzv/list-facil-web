import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottomsheet-cores',
  templateUrl: './bottomsheet-cores.component.html',
  styleUrls: ['./bottomsheet-cores.component.css']
})
export class BottomsheetCoresComponent implements OnInit {
  selecionada: string;
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

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: { cor: string },
    private bottomSheetRef: MatBottomSheetRef<BottomsheetCoresComponent>
  ) { }

  ngOnInit(): void {
    this.selecionada = this.data.cor;
  }

  onClickSelect(cor: string) {
    this.selecionada = cor;
    this.bottomSheetRef.dismiss(this.selecionada);
  }

}
