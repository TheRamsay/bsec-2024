import { getStocksByUser } from "$lib/api/stocks";
import { getUserByName } from "$lib/api/users";
import { decimal } from "drizzle-orm/mysql-core";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const user = await getUserByName("pepik123");
    const userStocks = await getStocksByUser(1);
    let formattedAssets : Array<any> = []
    let graphValDict : { [name: string]: number } = {}
    userStocks.forEach(el=>{
        formattedAssets.push({
                "name": el.security.name,
                "price": el.security.price, 
                "quantity": el.stock.amount,
                "image": el.security.logo,
        })
        if(!(el.security.name in graphValDict))
            graphValDict[el.security.name] = 0;
        graphValDict[el.security.name]+= +el.security.price * el.stock.amount;
    })
    let graphAssets :Array<{value: number, name: string}> = []
    for (let key in graphValDict) {
        let value = graphValDict[key];
        graphAssets.push({value:graphValDict[key],name:key})
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