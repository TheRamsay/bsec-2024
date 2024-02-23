import { getStocksByUser } from '$lib/api/stocks';

export async function load() {
	let stocks = await getStocksByUser(1);

	return {
		stocks: stocks
	};
}
