import {plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import {Usuario} from '../../database/model/table.model';
import {
  UsuarioControllerABC,
  UsuarioGranted,
  requiredAuthInfo,
  requiredUserInfo,
} from '../model/userCtrl.model';
import {NotaController} from '../nota/nota.controller';
import {plainToClass} from 'class-transformer';
import {
  AuthenticateUsuarioDto,
  createUsuarioDto,
} from '../../guards/Dtos/usuario.dto';
import {checkErrorContatrainsArrays} from '../../utils/index.utils';

export class UsuarioController extends UsuarioControllerABC {
  public createRecord(user: requiredUserInfo): Promise<Usuario> {
    return new Promise(async (resolve, reject) => {
      try {
        const userDto = plainToInstance(createUsuarioDto, user);
        const errors = await validate(userDto);
        if (errors.length > 0) {
          const validationErrors = checkErrorContatrainsArrays(errors);

          throw `${validationErrors}`;
        }
        const nota = new NotaController();
        const exists = await this.getOneByProp({telefone: user.telefone});
        if (exists) {
          throw 'já existe um usuário com mesmo numéro de telefone';
        }

        const usuario = await this.insertOne(user);
        await nota.createFirstNota(usuario.id_usuario);
        resolve(usuario);
      } catch (error) {
        reject(error);
      }
    });
  }
  public authenticate(usuario: requiredAuthInfo): Promise<UsuarioGranted> {
    return new Promise<Usuario>(async (resolve, reject) => {
      try {
        const AuthUsuarioDto = plainToInstance(AuthenticateUsuarioDto, usuario);
        const errors = await validate(AuthUsuarioDto);

        if (errors.length > 0) {
          const validationErrors = checkErrorContatrainsArrays(errors);
          throw `${validationErrors}`;
        }

        const exists = await this.getOneByProp(usuario);
        console.log(exists);
        if (!exists) {
          throw 'Número de telefone ou senha incorretos. Por favor, verifique suas informações e tente novamente.';
        }
        Object.assign(exists, {senha: ''});
        resolve(exists);
      } catch (error) {
        reject(error);
      }
    });
  }
}
