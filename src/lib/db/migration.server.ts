import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import { drizzle_db } from './connection.server';

export const migrateDb = async () => {
	console.log('Migrating...');
	await migrate(drizzle_db, { migrationsFolder: 'drizzle' });
};
