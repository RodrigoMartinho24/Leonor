import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { app } from "electron";
import path from "path";

const databasePath = path.join(
  app.getPath("userData"),
  "database.sqlite"
);

const sqlite = new Database(databasePath);

export const db = drizzle({
  client: sqlite
});

export { sqlite };