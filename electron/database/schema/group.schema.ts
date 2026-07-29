import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm/_relations';
import { music } from './music.schema';
import { GroupType } from '../../../shared/enums/group-type';

export const groups = sqliteTable('groups', {
  id: integer().primaryKey(),
  title: text().notNull(),
  type: text().$type<GroupType>().notNull(),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  music: many(music),
}));
