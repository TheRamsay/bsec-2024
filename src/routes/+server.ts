import { getErrorResponse } from '$lib/api/api';
import { schema_db } from '$lib/db/connection.server';

export async function GET({ params, request }) {
	console.log('GET /');
	const transactions = await schema_db.query.transactions.findMany();

	return new Response(JSON.stringify(transactions), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
