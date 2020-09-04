import knex from "knex";
const knexfile = require("../knexfile");

export const usersDb = knex(knexfile.development);
