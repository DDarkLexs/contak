export enum AuthPath {
  ENTRADA = 'ENTRADA',
  REGISTRO = 'REGISTRO',
}
export interface AuthProps {
  path: AuthPath;
  setPath: Function;
  navigation?: any;
}
