import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { groups } from "./group.schema";
import { relations } from "drizzle-orm/_relations";

export const music = sqliteTable("music", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  lyrics: text(),
  groupId: integer().references(() => groups.id).notNull()
});

export const personsRelations = relations(music, ({ one }) => ({
  group: one(groups, {
    fields: [music.groupId],
    references: [groups.id],
  }),
}));