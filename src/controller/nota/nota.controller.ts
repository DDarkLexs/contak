import {Nota} from '../../database/model/table.model';
import { QueryContagem } from '../../database/repository/nota.repository';
import {
  NotaControllerABC,
  ReqContagem,
  ReqNotaDeContagem,
} from '../model/notaCtrl.model';

export class NotaController extends NotaControllerABC {
  constructor() {
    super();
  }
   public async getContagens(): Promise<QueryContagem[]> {
    return await this.getAllFromOne()
  }
  public consultaNotaKwanza(): Promise<Nota[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const consulta = this.getAllByOneUsuario();
        resolve(consulta);
      } catch (error) {
        reject(error);
      }
    });
  }
  public registrarNumeracao(
    contagem: ReqContagem[],
    notaDeContagem: ReqNotaDeContagem,
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const {id_notaDeContagem} = await this.insertOneIntoNotaDeContagem(
          notaDeContagem,
        );

        const todo: ReqContagem[] = contagem.map(conta => {
          return {
            ...conta,
            id_notaDeContagem,
          };
        });
        // todo[1].
        await this.insertOneIntoContagemArray(todo);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
