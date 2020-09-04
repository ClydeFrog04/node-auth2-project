import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", tableBuilder => {
        tableBuilder.increments("id");
        tableBuilder.text("username").notNullable().unique();
        tableBuilder.text("password").notNullable();
        tableBuilder.text("department").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("users");
}

