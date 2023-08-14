import {knex as con, RNSqliteDialect, Config} from 'knex-react-native-sqlite';

const knex: Config = con({
  client: RNSqliteDialect,
  connection: {
    name: 'contakDB.db',
    location: 'library',
  },
  useNullAsDefault: true,
});

knex.raw('PRAGMA foreign_keys = ON;').then(() => {
  // console.log('verificação de chave estrangeira ativada!');
});

export class ContakDB {
  private _knex: Config;

  constructor() {
    this._knex = knex;
  }
  set knex(knexConfig: Config) {
    this._knex = knexConfig;
  }

  public get knex() {
    return this._knex;
  }

  public async tableExists(tableName: string): Promise<boolean> {
    const result = await this.knex.schema.hasTable(tableName);
    return result;
  }
  protected drop(nome: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.knex.schema.dropTableIfExists(nome);
        resolve(`tabela ${nome} foi apagado!`);
      } catch (error) {
        reject(error);
      }
    });
  }
}
