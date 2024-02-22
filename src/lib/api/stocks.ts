import { schema_db } from "$lib/db/connection.server";
import { securities, type Security } from "$lib/db/schemes/security";
import { stocks, type Stock, type InsertStock } from "$lib/db/schemes/stock";
import { transactions } from "$lib/db/schemes/transaction";
import { eq, type InferInsertModel } from "drizzle-orm";

export const getStocksByUser = async (
    userId: number
    ): Promise<Array<{stock: Stock, security: Security}>> => {
        const data = await schema_db.query.stocks.findMany({
            where: eq(stocks.userId, userId),
            with: {
                security:true
            }
        });
    
        return data.map(el=>({stock: el ,security: el.security})); 
    };

export const buyStock = async (
    stock: InsertStock
    ):  Promise<number> => {
    const security = await schema_db.query.securities.findFirst({where: eq(securities.id,stock.securityId)})
    const transactionResponse = await schema_db.insert(transactions).values(
        {userId: stock.userId,amount: (-security!.price * stock.amount).toString(), created_at: new Date()}
        ).returning();
    const response = await schema_db.insert(stocks).values(stock).returning();
    return response[0].id;
    };

export const sellStock = async(
    stockID : number): Promise<number> => {
        const response = await schema_db.delete(stocks).where(eq(stocks.id, stockID));
        return stockID;
    }
