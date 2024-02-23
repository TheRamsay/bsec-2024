import { timestamp, text, pgTable, serial, decimal, uuid } from 'drizzle-orm/pg-core';
import { sql, type InferSelectModel, relations, type InferInsertModel } from 'drizzle-orm';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
    supabaseUid: uuid('supabase_uid'),
	username: text('username').notNull().unique(),
	created_at: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	balance: decimal('balance').notNull()
});

export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;
