export interface Usuario {
  id_usuario: number;
  nome: string;
  senha: string;
  telefone: string;
  datacad: Date | string; // You might want to use a specific Date type here
}

export interface Nota {
  id_nota: number;
  denominacao: string;
  valor: number;
  id_usuario: number;
}

export interface NotaDeContagem {
  id_notaDeContagem: number;
  titulo: string;
  vencimento: Date | string; // You might want to use a specific Date type here
  datacad: Date | Date; // You might want to use a specific Date type here
}

export interface Contagem {
  id_contagem: number;
  quantidade: number;
  id_nota: number;
  id_notaDeContagem: number;
}

export interface Artigo {
  id_artigo: number;
  nome: string;
}

export interface NotaDeArtigo {
  id_notaDeArtigo: number;
  datacad: Date | string; // You might want to use a specific Date type here
  id_artigo: number;
  id_usuario: number;
}

export interface PrecoVenda {
  Id_precoVenda: number;
  precoCompra: number;
  percentagem: number;
  quantidade: number;
  id_artigo: number;
}
