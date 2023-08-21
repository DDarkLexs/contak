import {getUser} from '../../appStorage/index.storage';
import {ReqContagem} from '../../controller/model/notaCtrl.model';
import {
  NotaRepositoryABC,
  ReqNotaDeContagem,
  requiredNotaInfo,
} from '../model/index.model';
import {Contagem, Nota, NotaDeContagem, Usuario} from '../model/table.model';

type PartialNota = Partial<Nota>;
export type QueryContagem = Partial<Pick<Nota, 'id_nota'>> &
  Partial<
    Pick<NotaDeContagem, 'titulo' | 'vencimento' | 'id_notaDeContagem'>
  > & {
    total: number;
    qtd: number;
  };
export type NotaForInput = Nota | {quantidade?: number};

export class NotaRepository extends NotaRepositoryABC {
  constructor() {
    super();
    // this.autoInsert();
  }
  protected insertOne(nota: requiredNotaInfo): Promise<Nota> {
    return new Promise(async (resolve, reject) => {
      try {
        const {id_usuario} = (await getUser()) || nota;
        const id_nota: number = (
          await this.knex
            .insert({
              ...nota,
              id_usuario,
            })
            .into('nota')
        )[0];
        const response: Nota = await this.getOne(id_nota);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
  protected deleteOneNotaDeContagem(id_notaDeContagem: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log('In');
        await this.knex.raw(
          `DELETE FROM notaDeContagem WHERE id_notaDeContagem = ${id_notaDeContagem}`,
        );
        // console.log('Out');
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  protected getOne(id_nota: number): Promise<Nota> {
    return new Promise(async (resolve, reject) => {
      try {
        const nota: Nota = await this.knex
          .select()
          .from('nota')
          .where('id_nota', id_nota)
          .first();
        if (!nota) {
          throw 'esta nota não existe';
        }

        resolve(nota);
      } catch (error) {
        reject(error);
      }
    });
  }
  protected getOneContagem(id_contagem: number): Promise<Contagem> {
    return new Promise(async (resolve, reject) => {
      try {
        const contagem: Contagem = await this.knex
          .select()
          .from('contagem')
          .where('id_contagem', id_contagem)
          .first();
        if (!contagem) {
          throw 'esta contagem não existe';
        }

        resolve(contagem);
      } catch (error) {
        reject(error);
      }
    });
  }
  protected getAllFromOne(): Promise<QueryContagem[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const {id_usuario} = await getUser();
        const response: QueryContagem[] = await this.knex
          .select(['notaDeContagem.*'])
          .select(
            this.knex.raw('SUM(nota.valor * contagem.quantidade) as total'),
            this.knex.raw('SUM(contagem.quantidade) as qtd'),
          )
          .from('contagem')
          .join('nota', 'contagem.id_nota', '=', 'nota.id_nota')
          .join(
            'notaDeContagem',
            'contagem.id_notaDeContagem',
            '=',
            'notaDeContagem.id_notaDeContagem',
          )
          .where('nota.id_usuario', '=', id_usuario) // Substitua idUsuario pelo valor desejado
          .groupBy('notaDeContagem.id_notaDeContagem')
          .orderBy('notaDeContagem.id_notaDeContagem', 'desc');
        if (!response) {
          throw 'esta nota não existe';
        }
        resolve(response);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }
  protected getOneNotaDeContagem(
    id_notaDeContagem: NotaDeContagem['id_notaDeContagem'],
  ): Promise<NotaDeContagem> {
    return new Promise(async (resolve, reject) => {
      try {
        const notaDeContagem: NotaDeContagem = await this.knex
          .select()
          .from('notaDeContagem')
          .where('id_notaDeContagem', id_notaDeContagem)
          .first();
        if (!notaDeContagem) {
          throw 'esta nota de contagem não existe';
        }

        resolve(notaDeContagem);
      } catch (error) {
        reject(error);
      }
    });
  }
  protected getOneByProp(nota: PartialNota): Promise<Nota> {
    return new Promise(async (resolve, reject) => {
      try {
        const query: Nota = await this.knex
          .select()
          .from('nota')
          .where(nota)
          .first();

        resolve(query);
      } catch (error) {
        reject(error);
      }
    });
  }
  protected getAllByOneUsuario(): Promise<NotaForInput[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const {id_usuario} = await getUser();
        const query: NotaForInput[] = await this.knex
          .select()
          .from('nota')
          .where({id_usuario});
        resolve(query);
      } catch (error) {
        reject(error);
      }
    });
  }
  protected insertOneIntoContagemArray(contagem: ReqContagem[]): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.knex.insert(contagem).into('contagem');
        // const response: Contagem = await this.getOneContagem(id_contagem);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  protected insertOneIntoNotaDeContagem(
    notaDeContagem: ReqNotaDeContagem,
  ): Promise<NotaDeContagem> {
    return new Promise(async (resolve, reject) => {
      try {
        const id_notaDeContagem: number = (
          await this.knex
            .insert({
              ...notaDeContagem,
              datacad: new Date().toISOString(),
            })
            .into('notaDeContagem')
        )[0];
        const response: NotaDeContagem = await this.getOneNotaDeContagem(
          id_notaDeContagem,
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
  protected async autoInsert(id_usuario: Usuario['id_usuario']): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        for (let i = 0; i < this.kwanza.length; i++) {
          const nota: number = this.kwanza[i];
          const NotaEmKwanza: requiredNotaInfo = {
            denominacao: `${nota} kwanza`,
            valor: nota,
            id_usuario,
          };
          const exists = await this.getOneByProp(NotaEmKwanza);

          if (!exists) {
            await this.insertOne(NotaEmKwanza);
          }
        }
        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}
