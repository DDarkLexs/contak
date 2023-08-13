import {UsuarioRepositoryABC} from '../model/index.model';
import {Usuario} from '../model/table.model';
export class UsuarioRepository extends UsuarioRepositoryABC {
  constructor() {
    super();
  }
  protected getOne<T extends number | undefined>(
    id_usuario: T,
  ): Promise<Usuario> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.knex('usuario')
          .select()
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
  protected insertOne(usuario: Usuario): Promise<Usuario> {
    return new Promise(async (resolve, reject) => {
      try {
        const id_usuario: number = (
          await this.knex('usuario').insert(usuario)
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
        await this.knex('usuario')
          .update(user)
          .where('id_usuario', user.id_usuario);
        const usuario: Usuario = await this.getOne(user.id_usuario);
        resolve(usuario);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}
