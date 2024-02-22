import { drizzle_db, schema_db } from "$lib/db/connection.server";
import { transactions, type Transaction } from "$lib/db/schemes/transaction";
import { eq } from "drizzle-orm";

export const getTransactions = async (
    userId: number
): Promise<Array<Transaction>> => {
	const data = await schema_db.query.transactions.findMany({
        where: eq(transactions.userId, userId)
    });

	return data; 
};
