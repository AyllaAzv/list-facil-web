import { Usuario } from './usuario';
export interface Categoria {
    id: number;
    nome: String;
    descricao: String;
    usuario: Usuario;
}
