import { schema_db } from "$lib/db/connection.server";
import { stocks, type Stock } from "$lib/db/schemes/stock";
import { eq } from "drizzle-orm/pg-core/expressions";

export const getStocksByUser = async (
    userId: number
    ): Promise<Array<Stock>> => {
        const data = await schema_db.query.stocks.findMany({
            where: eq(stocks.userId, userId)
        });
    
        return data; 
    };