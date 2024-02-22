import { timestamp, text, varchar, pgTable, serial, decimal, doublePrecision } from 'drizzle-orm/pg-core';
import { sql, type InferSelectModel, relations } from 'drizzle-orm';

export const transactions = pgTable('transactions', {
	id: serial('id').primaryKey(),
	name: varchar('name').notNull(),
	bic: varchar('bic').notNull(),
	isin: varchar('isin').notNull(),
	price: decimal('price').notNull(),
	min: decimal('min').notNull(),
	max: decimal('max').notNull(),
    positive_case: doublePrecision('positive_case').notNull(),
    negative_case: doublePrecision('negative_case').notNull(),
    neutral_case: doublePrecision('neutral_case').notNull(),
	created_at: timestamp('created_at')
		.notNull()
		.default(sql`now()`)
});


export type Transaction = InferSelectModel<typeof transactions>;
