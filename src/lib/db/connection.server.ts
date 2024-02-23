import { drizzle } from 'drizzle-orm/postgres-js';

import { DATABASE_URL } from '$env/static/private';
import postgres from 'postgres';
import { migrateDb } from './migration.server';

// import * as exampleSchema from '$lib/db/schemes/exampleSchema';
import * as security from '$lib/db/schemes/security';
import * as user from '$lib/db/schemes/user';
import * as stock from '$lib/db/schemes/stock';
import * as reoccuringTransaction from '$lib/db/schemes/reocuring_transaction';
import * as transaction from '$lib/db/schemes/transaction';

export const client = postgres(DATABASE_URL);
export const drizzle_db = drizzle(client);

export const schema_db = drizzle(client, {
	schema: {
		// ...exampleSchema
		...reoccuringTransaction,
		...security,
		...user,
		...stock,
		...transaction
	}
});

// await migrateDb();
