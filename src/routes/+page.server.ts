import { getStocksByUser } from "$lib/api/stocks";
import { getUserByName } from "$lib/api/users";
import { decimal } from "drizzle-orm/mysql-core";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const user = await getUserByName("pepik123");
    const userStocks = await getStocksByUser(1);
    const formattedAssets: Array<any> = []
    const graphValDict: { [name: string]: number } = {}

    userStocks.forEach(el => {
        formattedAssets.push({
            "name": el.security.name,
            "price": el.security.price,
            "quantity": el.stock.amount,
            "image": `https://www.investcroc.com/logos/${el.security.bic.toUpperCase()}.webp`,
        })
        if (!(el.security.name in graphValDict))
            graphValDict[el.security.name] = 0;
        graphValDict[el.security.name] += +el.security.price * el.stock.amount;
    })
    const graphAssets: Array<{ value: number, name: string }> = []
    for (const key in graphValDict) {
        graphAssets.push({ value: graphValDict[key], name: key })
    }
    return {
        user: {
            name: user.username,
            balance: user.balance
        },
        assets: formattedAssets,
        graphAssets: graphAssets
    };
}