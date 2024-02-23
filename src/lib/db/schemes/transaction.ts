import { timestamp, text, pgTable, serial, decimal, uuid, integer } from 'drizzle-orm/pg-core';
import { sql, type InferSelectModel, relations, type InferInsertModel } from 'drizzle-orm';
import { users } from './user';

export const transactions = pgTable('transactions', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	amount: decimal('amount').notNull(),
	description: text('description').default('expense'),
	created_at: timestamp('created_at')
		.notNull()
		.default(sql`now()`)
});

export type Transaction = InferSelectModel<typeof transactions>;
export type InsertTransaction = InferInsertModel<typeof transactions>;
