import {SchemaABC} from '../model/index.model';
import {
  Artigo,
  Contagem,
  Nota,
  NotaDeArtigo,
  NotaDeContagem,
  PrecoVenda,
  Usuario,
} from '../model/table.model';
// import { up } from './migrations/index.migration';

export class Schema extends SchemaABC {
  constructor() {
    super();
    // this.createAll();
    // this.WipeAllDataByOneTable('notaDeContagem');
  }
  private async createUsuario() {
    return new Promise(async (resolve, reject) => {
      try {
        const tab = 'usuario';
        const schema = await this.tableExists(tab);
        if (!schema) {
          await this.knex.schema.createTable<Usuario>(tab, (table: any) => {
            table.increments('id_usuario').primary();
            table.string('nome').notNullable();
            table.string('senha').notNullable();
            table.string('telefone').notNullable().unique();
            table.datetime('datacad').notNullable();
          });

          console.log(`Table "${tab}" created successfully.`);
        } else {
          // console.log(`Table "${tab}" already exists.`);
        }
        resolve(`Table "${tab}" created successfully.`);
      } catch (error) {
        reject(error);
      }
    });
  }
  private async createNota() {
    return new Promise(async (resolve, reject) => {
      try {
        const tab = 'nota';
        const schema = await this.tableExists(tab);
        if (!schema) {
          await this.knex.schema.createTable<Nota>(tab, (table: any) => {
            table.increments('id_nota').primary();
            table.string('denominacao').notNullable();
            table.integer('valor').notNullable();
            table.integer('id_usuario').unsigned().notNullable();
            table
              .foreign('id_usuario')
              .references('usuario.id_usuario')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
          });

          console.log(`Table "${tab}" created successfully.`);
        } else {
          // console.log(`Table "${tab}" already exists.`);
        }
        resolve(`Table "${tab}" created successfully.`);
      } catch (error) {
        reject(error);
      }
    });
  }
  private async createNotaDeContagem() {
    return new Promise(async (resolve, reject) => {
      try {
        const tab = 'notaDeContagem';
        const schema = await this.tableExists(tab);
        if (!schema) {
          await this.knex.schema.createTable<NotaDeContagem>(
            tab,
            (table: any) => {
              table.increments('id_notaDeContagem').primary();
              table.string('titulo').notNullable();
              table.datetime('vencimento').notNullable();
              table.datetime('datacad').notNullable();
            },
          );

          console.log(`Table "${tab}" created successfully.`);
        } else {
          // console.log(`Table "${tab}" already exists.`);
        }
        resolve(`Table "${tab}" created successfully.`);
      } catch (error) {
        reject(error);
      }
    });
  }
  private async createContagem() {
    return new Promise(async (resolve, reject) => {
      try {
        const tab = 'contagem';
        const schema = await this.tableExists(tab);
        if (!schema) {
          await this.knex.schema.createTable<Contagem>(tab, (table: any) => {
            table.increments('id_contagem').primary();
            table.integer('quantidade').notNullable();
            table.integer('id_nota').unsigned().notNullable();
            table.integer('id_notaDeContagem').unsigned().notNullable();
            table
              .foreign('id_nota')
              .references('nota.id_nota')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
            table
              .foreign('id_notaDeContagem')
              .references('notaDeContagem.id_notaDeContagem')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
          });

          console.log(`Table "${tab}" created successfully.`);
        } else {
          // console.log(`Table "${tab}" already exists.`);
        }
        resolve(`Table "${tab}" created successfully.`);
      } catch (error) {
        reject(error);
      }
    });
  }
  private async createArtigo() {
    return new Promise(async (resolve, reject) => {
      try {
        const tab = 'artigo';
        const schema = await this.tableExists(tab);
        if (!schema) {
          await this.knex.schema.createTable<Artigo>(tab, (table: any) => {
            table.increments('id_artigo').primary();
            table.string('nome').notNullable();
          });

          console.log(`Table "${tab}" created successfully.`);
        } else {
          // console.log(`Table "${tab}" already exists.`);
        }
        resolve(`Table "${tab}" created successfully.`);
      } catch (error) {
        reject(error);
      }
    });
  }
  private async createNotaDeArtigo() {
    return new Promise(async (resolve, reject) => {
      try {
        const tab = 'notaDeArtigo';
        const schema = await this.tableExists(tab);
        if (!schema) {
          await this.knex.schema.createTable<NotaDeArtigo>(
            tab,
            (table: any) => {
              table.increments('id_notaDeArtigo').primary();
              table.integer('id_usuario').unsigned().notNullable();
              table.integer('id_artigo').unsigned().notNullable();
              table.date('datacad').notNullable();
              table
                .foreign('id_usuario')
                .references('usuario.id_usuario')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
              table
                .foreign('id_artigo')
                .references('artigo.id_artigo')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            },
          );

          console.log(`Table "${tab}" created successfully.`);
        } else {
          // console.log(`Table "${tab}" already exists.`);
        }
        resolve(`Table "${tab}" created successfully.`);
      } catch (error) {
        reject(error);
      }
    });
  }
  private async createPrecoVenda() {
    return new Promise(async (resolve, reject) => {
      try {
        const tab = 'precoVenda';
        const schema = await this.tableExists(tab);
        if (!schema) {
          await this.knex.schema.createTable<PrecoVenda>(tab, (table: any) => {
            table.increments('Id_precoVenda').primary();
            table.decimal('precoCompra', 11, 2).notNullable();
            table.decimal('percentagem', 11, 2).notNullable();
            table.integer('quantidade').notNullable();
            table.integer('id_artigo').unsigned().notNullable();
            table
              .foreign('id_artigo')
              .references('artigo.id_artigo')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
          });

          console.log(`Table "${tab}" created successfully.`);
        } else {
          // console.log(`Table "${tab}" already exists.`);
        }
        resolve(`Table "${tab}" created successfully.`);
      } catch (error) {
        reject(error);
      }
    });
  }
  public async createAll(): Promise<any> {
    try {
      // await up();
      await this.createUsuario();
      await this.createContagem();
      await this.createNotaDeArtigo();
      await this.createArtigo();
      await this.createPrecoVenda();
      await this.createNotaDeContagem();
      await this.createNota();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public dropTable(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.knex.schema
          .dropTableIfExists('usuario')
          .dropTableIfExists('notaDeArtigo')
          .dropTableIfExists('artigo')
          .dropTableIfExists('precoVenda')
          .dropTableIfExists('nota')
          .dropTableIfExists('contagem')
          .dropTableIfExists('notaDeContagem');

        console.log('All tables delete');
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }
  public async WipeAllDataByOneTable(name: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.knex.from(name).del();

        resolve('All data cleared from tables.');
      } catch (err) {
        reject(err);
      } finally {
        // Close the database connection
      }
    });
  }
  updateTable(): Promise<any> {
    return this.knex.schema.alterTable('notaDeContagem');
  }
  // async clearAllTables() {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       await this.knex('notaDeArtigo').del();
  //       await this.knex('validade').del();
  //       await this.knex('artigo').del();
  //       await this.knex('seccao').del();
  //       await this.knex('usuario').del();
  //       await this.knex('lembrete').del();

  //       resolve('All data cleared from tables.');
  //     } catch (err) {
  //       reject('Error clearing data:', err);
  //     } finally {
  //       // Close the database connection
  //     }
  //   });
  // }
}

export default new Schema();
