import { schema_db } from '$lib/db/connection.server';
import { securities, type Security } from '$lib/db/schemes/security';
import { stocks, type Stock, type InsertStock } from '$lib/db/schemes/stock';
import { transactions } from '$lib/db/schemes/transaction';
import { and, desc, eq } from 'drizzle-orm';

export const getStocksByUser = async (
	userId: number
): Promise<Array<{ stock: Stock; security: Security }>> => {
	const data = await schema_db.query.stocks.findMany({
		where: eq(stocks.userId, userId),
		with: {
			security: true
		},
		orderBy: desc(stocks.createdAt)
	});

	return data.map((el) => ({ stock: el, security: el.security }));
};

export const getStocksBySecurity = async (
	securityId: number,
	userId: number
): Promise<Stock | undefined> => {
	return await schema_db.query.stocks.findFirst({
		where: and(eq(stocks.securityId, securityId), eq(stocks.userId, userId))
	});
};

export const buyStock = async (stock: InsertStock): Promise<number> => {
	const security = await schema_db.query.securities.findFirst({
		where: eq(securities.id, stock.securityId)
	});
	await schema_db
		.insert(transactions)
		.values({
			userId: stock.userId,
			amount: (-security!.price * stock.amount).toString(),
			created_at: new Date(),
			description: 'Bought ' + stock.amount + ' shares of ' + security?.bic
		})
		.returning();
	const response = await schema_db.insert(stocks).values(stock).returning();
	return response[0].id;
};

export const sellStock = async (stock: InsertStock): Promise<number> => {
	const security = await schema_db.query.securities.findFirst({
		where: eq(securities.id, stock.securityId)
	});
	await schema_db
		.insert(transactions)
		.values({
			userId: stock.userId,
			amount: (+security!.price * stock.amount).toString(),
			description: 'Sold ' + stock.amount + ' shares of ' + security?.bic,
			created_at: new Date()
		})
		.returning();

	const response = await schema_db.query.stocks.findFirst({
		where: eq(stocks.securityId, stock.securityId)
	});

	if (response?.amount == stock.amount) {
		await schema_db.delete(stocks).where(eq(stocks.securityId, stock.securityId));
	} else {
		await schema_db
			.update(stocks)
			.set({ amount: response!.amount - stock.amount })
			.where(eq(stocks.securityId, stock.securityId));
	}

	return response!.id;
};
