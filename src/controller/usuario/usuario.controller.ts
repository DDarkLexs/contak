import {Usuario} from '../../database/model/table.model';
import {
  UsuarioControllerABC,
  requiredAuthInfo,
  requiredUserInfo,
} from '../model/userCtrl.model';

export class UsuarioController extends UsuarioControllerABC {
  public createRecord(user: requiredUserInfo): Promise<Usuario> {
    return new Promise(async (resolve, reject) => {
      try {
        const exists = await this.getOneByProp({telefone: user.telefone});
        if (exists) {
          throw 'já existe um usuário com mesmo numéro de telefone';
        }

        const usuario = await this.insertOne(user);
        resolve(usuario);
      } catch (error) {
        reject(error);
      }
    });
  }
  public authenticate(usuario: requiredAuthInfo): Promise<Usuario> {
    return new Promise<Usuario>(async (resolve, reject) => {
      try {
        const exists = await this.getOneByProp(usuario);
        if (!exists) {
          throw 'Número de telefone ou senha incorretos. Por favor, verifique suas informações e tente novamente.';
        }

        resolve(exists);
      } catch (error) {
        reject(error);
      }
    });
  }
}
