import {
	timestamp,
	varchar,
	pgTable,
	serial,
	decimal,
	doublePrecision
} from 'drizzle-orm/pg-core';
import { sql, type InferSelectModel, relations, type InferInsertModel } from 'drizzle-orm';

export const securities = pgTable('securities', {
	id: serial('id').primaryKey(),
	name: varchar('name').notNull(),
	bic: varchar('bic').notNull(),
	isin: varchar('isin').notNull(),
	price: decimal('price').notNull(),
	min: decimal('min').notNull(),
	max: decimal('max').notNull(),
	positiveCase: doublePrecision('positive_case').notNull(),
	negativeCase: doublePrecision('negative_case').notNull(),
	neutralCase: doublePrecision('neutral_case').notNull(),
	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`)
});

export type Security = InferSelectModel<typeof securities>;
export type InsertSecurity = InferInsertModel<typeof securities>;
