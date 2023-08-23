import {ContakDB} from '../../config/index.config';
import {ReqContagem} from '../../controller/model/notaCtrl.model';
import {ArtigoDto} from '../../guards/Dtos/artigo.dto';
import {NotaForInput, QueryContagem} from '../repository/nota.repository';
import {Nota, Usuario, NotaDeContagem, Artigo} from './table.model';

export type requiredNotaInfo = Required<
  Pick<Nota, 'valor' | 'denominacao' | 'id_usuario'>
>;
export type notaAngolano = Nota['valor'];
export type ReqNotaDeContagem = Required<
  Omit<NotaDeContagem, 'id_notaDeContagem' | 'datacad'>
>;
// export type ReqContagem = Required<Omit<Contagem, 'id_nota'>>;
export abstract class SchemaABC extends ContakDB {
  public abstract createAll(): Promise<void>;
  public abstract dropTable(): Promise<any>;
}

export abstract class UsuarioRepositoryABC extends ContakDB {
  protected abstract getOne(
    id_usuario: Usuario['id_usuario'],
  ): Promise<Usuario>;
  protected abstract insertOne(usuario: Usuario): Promise<Usuario>;
  protected abstract getOneByProp(Usuario: Partial<Usuario>): Promise<Usuario>;
  // protected abstract deleteOne(id_usuario: number): Promise<void>;
  protected abstract updateOne(usuario: Usuario): Promise<Usuario>;
}

export abstract class NotaRepositoryABC extends ContakDB {
  protected readonly kwanza: notaAngolano[] = [
    10, 50, 100, 200, 500, 1000, 2000, 5000, 10000,
  ];
  protected abstract getOne(id_nota: Nota['id_nota']): Promise<Nota>;
  protected abstract getAllByOneUsuario(
    id_usuario: Nota['id_usuario'],
  ): Promise<NotaForInput[]>;
  protected abstract getOneByProp(nota: Partial<Nota>): Promise<Nota>;
  protected abstract insertOne(nota: requiredNotaInfo): Promise<Nota>;
  protected abstract insertOneIntoContagemArray(
    contagem: ReqContagem[],
  ): Promise<void>;

  protected abstract insertOneIntoNotaDeContagem(
    notaDeContagem: ReqNotaDeContagem,
  ): Promise<NotaDeContagem>;

  protected abstract getAllFromOne(): Promise<QueryContagem[]>;
  protected abstract deleteOneNotaDeContagem(
    id_notaDeContagem: NotaDeContagem['id_notaDeContagem'],
  ): Promise<void>;
  // protected abstract deleteOne(id_nota: Nota['id_nota']): Promise<void>;
  // protected abstract updateOne(nota: Required<Nota>): Promise<Nota>;
}

export abstract class ArtigoRepositoryABC extends ContakDB {
  protected abstract getOne(id_artigo: Artigo['id_artigo']): Promise<Artigo>;
  // protected abstract getAllByUsuario(
  //   id_usuario: Usuario['id_usuario'],
  // ): Promise<Artigo[]>;
  protected abstract saveOneArtigo(artigo: ArtigoDto): Promise<Artigo>;
  // protected abstract getOneByProp(): Promise<Artigo>;
  // protected abstract updateOne(): Promise<Artigo>;
  /* ^^^^^ artigo ^^^^^^ */
  // protected abstract saveOneNota(): Promise<Artigo>;
  // protected abstract getOneNota(
  //   id_artigo: NotaDeArtigo['id_notaDeArtigo'],
  // ): Promise<Artigo>;
  /* ^^^^^ Nota de artigo ^^^^^^ */

  // protected abstract deleteOne(id_usuario: number): Promise<void>;
}
