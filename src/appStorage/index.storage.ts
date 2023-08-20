import {Usuario} from '../database/model/table.model';
import asyncStorage from '@react-native-async-storage/async-storage';

type LocalStorageUserInfo = Required<Omit<Usuario, 'senha'>>;

export const setUser = async (
  user: LocalStorageUserInfo,
): Promise<LocalStorageUserInfo> => {
  await asyncStorage.setItem('usuario', JSON.stringify(user));
  return await getUser();
};

export const getUser = (): Promise<LocalStorageUserInfo> => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await asyncStorage.getItem('usuario');
      const user: LocalStorageUserInfo = JSON.parse(String(item));
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

export const removeUser = async (): Promise<boolean> => {
  await asyncStorage.removeItem('usuario');
  return true;
};
