import {knex} from '../../../config/index.config';

export async function up(): Promise<void> {
  await knex.schema.alterTable('notaDeContagem', function (table: any) {
    table.string('titulo').notNullable().default('');
  });
}

export async function down(): Promise<void> {
  await knex.schema.alterTable('notaDeContagem', function (table: any) {
    table.dropColumn('titulo');
  });
}
