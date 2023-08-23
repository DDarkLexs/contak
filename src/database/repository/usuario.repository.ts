import {requiredUserInfo} from '../../controller/model/userCtrl.model';
import {UsuarioRepositoryABC} from '../model/index.model';
import {Usuario} from '../model/table.model';

type PartialQueryUsuario = Partial<Usuario>;

export class UsuarioRepository extends UsuarioRepositoryABC {
  constructor() {
    super();
  }
  protected getOneByProp(user: PartialQueryUsuario): Promise<Usuario> {
    return new Promise(async (resolve, reject) => {
      try {
        const query: Usuario = await this.knex
          .select()
          .from('usuario')
          .where(user)
          .first();

        resolve(query);
      } catch (error) {
        reject(error);
      }
    });
  }

  protected getOne(id_usuario: number): Promise<Usuario> {
    return new Promise(async (resolve, reject) => {
      try {
        const user: Usuario = await this.knex
          .select()
          .from('usuario')
          .where('id_usuario', id_usuario)
          .first();
        if (!user) {
          throw 'este usuario não existe';
        }

        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }
  protected insertOne(usuario: requiredUserInfo): Promise<Usuario> {
    return new Promise(async (resolve, reject) => {
      try {
        const id_usuario: number = (
          await this.knex
            .insert({
              ...usuario,
              datacad: new Date().toISOString(),
            })
            .into('usuario')
        )[0];

        const user = await this.getOne(id_usuario);

        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }
  protected updateOne(user: Usuario): Promise<Usuario> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.knex
          .update(user)
          .from('usuario')
          .where('id_usuario', user.id_usuario);
        const usuario: Usuario = await this.getOne(user.id_usuario);
        resolve(usuario);
      } catch (error) {
        reject(error);
      }
    });
  }
}
