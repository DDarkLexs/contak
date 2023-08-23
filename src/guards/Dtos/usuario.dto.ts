import {IsNotEmpty, IsPhoneNumber, Length} from 'class-validator';
import {Usuario} from '../../database/model/table.model';

export interface UsuarioDto extends Omit<Usuario, 'id_usuario' | 'datacad'> {}
export class createUsuarioDto implements UsuarioDto {
  @IsNotEmpty({message: 'O nome não pode estar vazio!'})
  nome: string = '';
  @IsPhoneNumber('AO', {message: 'Numero de telefone inválido'})
  @IsNotEmpty({message: 'Informe o número de telefone!'})
  telefone: string = '';
  @IsNotEmpty({message: 'Informe a sua senha!'})
  @Length(6, 255, {message: 'A sua senha deve ser maior ou igual a 6!'})
  senha: string = '';
}

export interface AuthUsuarioDto extends Pick<Usuario, 'telefone' | 'senha'> {}
export class AuthenticateUsuarioDto implements AuthUsuarioDto {
  @IsPhoneNumber('AO', {message: 'O número de telefone é inválido!'})
  @IsNotEmpty({message: 'Informe o número de telefone!'})
  telefone: string = '';
  @IsNotEmpty({message: 'Informe a sua senha!'})
  senha: string = '';
}
