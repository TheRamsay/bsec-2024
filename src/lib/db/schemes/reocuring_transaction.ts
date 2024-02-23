import {
	timestamp,
	text,
	pgTable,
	serial,
	decimal,
	uuid,
	integer,
	pgEnum
} from 'drizzle-orm/pg-core';
import { sql, type InferSelectModel, relations, type InferInsertModel } from 'drizzle-orm';
import { users } from './user';

export const occurrenceEnum = pgEnum('occurrence', ['daily', 'weekly', 'monthly', 'yearly']);

export const reoccurringTransactions = pgTable('reoccurringTransactions', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	amount: decimal('amount').notNull(),
	occurrence: occurrenceEnum('occurrence').notNull(),
	created_at: timestamp('created_at')
		.notNull()
		.default(sql`now()`)
});

export type ReoccurringTransaction = InferSelectModel<typeof reoccurringTransactions>;
export type InsertReoccurringTransaction = InferInsertModel<typeof reoccurringTransactions>;
