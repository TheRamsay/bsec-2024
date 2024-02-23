import { getStocksByUser } from "$lib/api/stocks";

export async function load() {
    return {
        stocks: await getStocksByUser(1)
    }
}