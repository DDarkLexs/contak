import {SchemaABC} from './index.model';

export class Schema extends SchemaABC {
  constructor() {
    super();
  }
  public async createUsuario() {
    return new Promise(async (resolve, reject) => {
      try {
        const tab = 'usuario';
        const schema = await this.tableExists(tab);
        if (!schema) {
          await this.knex.schema.createTable(tab, (table: any) => {
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
          await this.knex.schema.createTable(tab, (table: any) => {
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
          await this.knex.schema.createTable(tab, (table: any) => {
            table.increments('id_notaDeContagem').primary();
            table.datetime('vencimento').notNullable();
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
  private async createContagem() {
    return new Promise(async (resolve, reject) => {
      try {
        const tab = 'contagem';
        const schema = await this.tableExists(tab);
        if (!schema) {
          await this.knex.schema.createTable(tab, (table: any) => {
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
          await this.knex.schema.createTable(tab, (table: any) => {
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
          await this.knex.schema.createTable(tab, (table: any) => {
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
  private async createPrecoVenda() {
    return new Promise(async (resolve, reject) => {
      try {
        const tab = 'precoVenda';
        const schema = await this.tableExists(tab);
        if (!schema) {
          await this.knex.schema.createTable(tab, (table: any) => {
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
  public async createAll() {
    try {
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
  public async dropTable(): Promise<any> {
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
      } catch (error) {
        reject(error);
      }
    });
  }
}
