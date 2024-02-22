import { timestamp, text, pgTable, serial, integer } from 'drizzle-orm/pg-core';
import { sql, type InferSelectModel, relations } from 'drizzle-orm';
import { securities } from './security';
import { users } from './user';

export const stocks = pgTable('stocks', {
	id: serial('id').primaryKey(),
	securityId: integer('security_id')
		.notNull()
		.references(() => securities.id),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	amount: integer('amount').notNull()
});

export const stockRelation = relations(stocks, ({ one }) => ({
	security: one(securities, {
		fields: [stocks.securityId],
		references: [securities.id]
	}),

	user: one(users, {
		fields: [stocks.userId],
		references: [users.id]
	})
}));

export type Stock = InferSelectModel<typeof stocks>;
