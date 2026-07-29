import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "./db";
import path from "path";

export function migrateDatabase() {
  migrate(db, {
    migrationsFolder: path.join(__dirname, "migrations"),
  });
}