import { Lembrete } from './lembrete';
import { Usuario } from './usuario';
import { Etiqueta } from './etiqueta';
import { Categoria } from './categoria';
import { Item } from './item';

export interface Lista {
    id: number;
    titulo: String;
    dataCriacao: Date;
    dataUltimaModificacao: Date;
    itens: Item[];
    categoria: Categoria;
    etiquetas: Etiqueta[];
    cor: String;
    usuario: Usuario;
    lembrete: Lembrete;
    fixa: Boolean;
    status: Boolean;
}
