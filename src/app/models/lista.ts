export interface Lista {
    id?: number;
    titulo: string;
    data_criacao: string;
    data_ultima_modificacao: string;
    itens: any[];
    categoria_id: number;
    categoria?: any;
    etiqueta?: any;
    etiqueta_id: number;
    cor?: string;
    usuario_id: string;
//    lembrete: Lembrete;
    fixa: boolean;
    status: boolean;
}
