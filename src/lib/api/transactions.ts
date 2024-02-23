import { drizzle_db, schema_db } from '$lib/db/connection.server';
import {
	transactions,
	type Transaction,
	type InsertTransaction
} from '$lib/db/schemes/transaction';
import { desc, eq, type InferInsertModel } from 'drizzle-orm';

export const getTransactionsByUser = async (userId: number): Promise<Array<Transaction>> => {
	const data = await schema_db.query.transactions.findMany({
		where: eq(transactions.userId, userId),
		orderBy: [desc(transactions.created_at)]
	});

	return data;
};

export const createTransaction = async (transaction: InsertTransaction): Promise<number> => {
	const response = await schema_db.insert(transactions).values(transaction).returning();
	return response[0].id;
};
