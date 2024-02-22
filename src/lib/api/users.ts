import { drizzle_db, schema_db } from "$lib/db/connection.server";
import { users, type User, type InsertUser } from "$lib/db/schemes/user";
import { eq, type InferInsertModel } from "drizzle-orm";

export const getUserByName = async (
    username: string
): Promise<User> => {
	const data = await schema_db.query.users.findFirst({
        where: eq(users.username, username)
    });

	return data!;
};


export const createUser = async(
    user: InsertUser
    ):  Promise<number> => {
    const response = await schema_db.insert(users).values(user).returning();
    return response[0].id;
  }
