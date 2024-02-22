import { drizzle_db, schema_db } from "$lib/db/connection.server";
import { securities, type Security, type InsertSecurity } from "$lib/db/schemes/security";
import { eq, type InferInsertModel } from "drizzle-orm";

export const getSecurities = async (
    username: string
): Promise<Array<Security>> => {
	const data = await schema_db.query.securities.findMany();
	return data;
};


export const createSecurity = async(
    security: InsertSecurity
    ):  Promise<number> => {
    const response = await schema_db.insert(securities).values(security).returning();
    return response[0].id;
  }
