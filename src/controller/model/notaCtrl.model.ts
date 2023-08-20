import {Nota, Contagem, NotaDeContagem} from '../../database/model/table.model';
import {NotaRepository} from '../../database/repository/nota.repository';

export type ReqContagem = Partial<
  Pick<Contagem, 'quantidade' | 'id_nota' | 'id_notaDeContagem'>
>;
export type ReqNotaDeContagem = Pick<NotaDeContagem, 'vencimento' | 'titulo'>;

export abstract class NotaControllerABC extends NotaRepository {
  constructor() {
    super();
  }
  public abstract consultaNotaKwanza(): Promise<Nota[]>;
  public abstract registrarNumeracao(
    contagem: ReqContagem[],
    notaDeContagem: ReqNotaDeContagem,
  ): Promise<void>;
  public abstract getContagens(): Promise<any[]>;
  
}
