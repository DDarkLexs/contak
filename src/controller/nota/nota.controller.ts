import {NotaDeContagem, Usuario} from '../../database/model/table.model';
import {useAppDispatch} from '../../store/hooks/store.hook';
import {
  NotaForInput,
  QueryContagem,
} from '../../database/repository/nota.repository';
import {
  NotaControllerABC,
  ReqContagem,
  ReqNotaDeContagem,
} from '../model/notaCtrl.model';
import {actions} from '../../store/reducers/nota/nota.reducer';
import {validate} from 'class-validator';
import {createNotaDeContagem} from '../../guards/Dtos/notaDeContagem.dto';
import {plainToInstance} from 'class-transformer';
import {checkErrorContatrainsArrays} from '../../utils/index.utils';

export class NotaController extends NotaControllerABC {
  constructor() {
    super();
  }
  public async getContagens(): Promise<QueryContagem[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.getAllFromOne();
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
  public consultaNotaKwanza(): Promise<NotaForInput[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const consulta = await this.getAllByOneUsuario();

        resolve(
          consulta.map(nota => {
            return {...nota, quantidade: 0};
          }),
        );
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
        const notadeContagemDto = plainToInstance(
          createNotaDeContagem,
          notaDeContagem,
        );
        const errors = await validate(notadeContagemDto);
        if (errors.length > 0) {
          const msg = checkErrorContatrainsArrays(errors);
          throw `${msg}`;
        }

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
  public async createFirstNota(
    id_usuario: Usuario['id_usuario'],
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.autoInsert(id_usuario);
        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
  public deleteNotaDeContagemOnlyOne(
    id_notaDeContagem: NotaDeContagem['id_notaDeContagem'],
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.deleteOneNotaDeContagem(id_notaDeContagem);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
