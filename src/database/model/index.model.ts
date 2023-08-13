import {ContakDB} from '../../config/index.config';
import {Usuario} from './table.model';

export abstract class SchemaABC extends ContakDB {
  public abstract createAll(): Promise<void>;
  public abstract dropTable(): Promise<any>;
}

export abstract class UsuarioRepositoryABC extends ContakDB {
  protected abstract getOne<T extends number>(id_usuario: T): Promise<Usuario>;
  protected abstract insertOne(usuario: Usuario): Promise<Usuario>;
  // protected abstract deleteOne(id_usuario: number): Promise<void>;
  protected abstract updateOne(usuario: Usuario): Promise<Usuario>;
}
