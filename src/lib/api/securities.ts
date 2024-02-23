import { drizzle_db, schema_db } from "$lib/db/connection.server";
import { securities, type Security, type InsertSecurity } from "$lib/db/schemes/security";
import { eq, type InferInsertModel } from "drizzle-orm";

export const getSecurities = async (
): Promise<Array<Security>> => {
    const data = await schema_db.query.securities.findMany();
    return data;
};

export const getSecurityByid = async (id: number): Promise<Security | undefined> => {
    return await schema_db.query.securities.findFirst({ where: eq(securities.id, id) });
};


export const createSecurity = async (
    security: InsertSecurity
): Promise<number> => {
    const response = await schema_db.insert(securities).values(security).returning();
    return response[0].id;
}
