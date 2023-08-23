import {NotaDeContagem} from '../../database/model/table.model';
import {IsNotEmpty, IsDateString} from 'class-validator';
export interface NotaDeContagemDto
  extends Pick<NotaDeContagem, 'titulo' | 'vencimento'> {}

export class createNotaDeContagem implements NotaDeContagemDto {
  @IsNotEmpty({message: 'Informe o titulo!'})
  titulo: string = '';
  @IsDateString({strict: true}, {message: 'Data de vencimento está inválido!'})
  @IsNotEmpty({message: 'Informe a data de vencimento!'})
  vencimento: string | Date = '';
}
