import { getStocksByUser } from "$lib/api/stocks";
import { getUserByName } from "$lib/api/users";
import { decimal } from "drizzle-orm/mysql-core";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const user = await getUserByName("pepik123");
    const userStocks = await getStocksByUser(1);
    let formattedAssets : Array<any> = []
    userStocks.forEach(el=>{
        formattedAssets.push({
                "name": el.security.name,
                "price": el.security.price, 
                "quantity": el.stock.amount,
                "image": `https://www.investcroc.com/logos/${el.security.bic}.webp`
        })
    })
    return {
        user: {
            name: user.username,
            balance: user.balance
        },
        assets: formattedAssets,
    };
}