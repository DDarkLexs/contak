import {Usuario} from '../../database/model/table.model';
import {UsuarioRepository} from '../../database/repository/usuario.repository';

export type requiredUserInfo = Required<
  Pick<Usuario, 'nome' | 'telefone' | 'senha'>
>;

export type requiredAuthInfo = Required<Pick<Usuario, 'telefone' | 'senha'>>;

export abstract class UsuarioControllerABC extends UsuarioRepository {
  constructor() {
    super();
  }
  protected abstract createRecord(usuario: requiredUserInfo): Promise<Usuario>;
  protected abstract authenticate(usuario: requiredAuthInfo): Promise<Usuario>;
}
