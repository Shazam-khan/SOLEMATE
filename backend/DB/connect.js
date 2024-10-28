import pg from "pg";

export const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "SoleMate",
  password: "shazam",
  port: 5432,
});
