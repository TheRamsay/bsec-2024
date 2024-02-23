import { drizzle_db, schema_db } from "$lib/db/connection.server";
import { reoccurringTransactions, type InsertReoccurringTransaction, type ReoccurringTransaction } from "$lib/db/schemes/reocuring_transaction";
import { eq, type InferInsertModel } from "drizzle-orm";

export const getReoccuringTransactionsByUser = async (
    userId: number
): Promise<Array<ReoccurringTransaction>> => {
	const data = await schema_db.query.reoccurringTransactions.findMany({
        where: eq(reoccurringTransactions.userId, userId)
    });

	return data; 
};


export const createReoccuringTransaction = async(
    reoccuring_transaction: InsertReoccurringTransaction
    ):  Promise<number> => {
    const response = await schema_db.insert(reoccurringTransactions).values(reoccuring_transaction).returning();
    return response[0].id;
  }

export const removeReoccuringTransaction = async(
    reoccuring_transaction_ID: number
    ):  Promise<number> => {
    const response = await schema_db.delete(reoccurringTransactions).where(eq(reoccurringTransactions.id, reoccuring_transaction_ID));
        return reoccuring_transaction_ID;
  }
