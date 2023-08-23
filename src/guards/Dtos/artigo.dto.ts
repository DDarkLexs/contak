import {Artigo, PrecoVenda} from '../../database/model/table.model';
import {IsNotEmpty} from 'class-validator';

export interface ArtigoDto extends Pick<Artigo, 'nome'> {}
export class CreateArtigoDto implements ArtigoDto {
  @IsNotEmpty({message: 'Informe o nome do artigo!'})
  nome: string = '';
}

export interface PrecoVendaDto
  extends Pick<PrecoVenda, 'percentagem' | 'precoCompra' | 'quantidade'> {}

export class CreatePrecoVendaDto implements PrecoVendaDto {
  @IsNotEmpty({message: 'Informe a percentagem!'})
  percentagem: number = 0;
  @IsNotEmpty({message: 'Informe o preço de compra!'})
  precoCompra: number = 0;
  @IsNotEmpty({message: 'Informe a quantidade!'})
  quantidade: number = 0;
}
