export type ProductType = {
    nome: string;
    descricao: string;
    preco: number;
    imagens: Array<string>;
    categoria: string;
    destaque?: boolean; 
    tags: Array<string>;
}