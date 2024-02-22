import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        user: {
            name: "Dominik Huml",
            balance: 120.32,
        },
        assets: [
            {
                "name": "AMZN",
                "price": 3456.32,
                "quantity": 2,
                "image": "https://www.investcroc.com/logos/AMZN.webp"
            },
            {
                "name": "AAPL",
                "price": 123.32,
                "quantity": 5,
                "image": "https://www.investcroc.com/logos/AAPL.webp"
            },
            {
                "name": "GOOGL",
                "price": 2345.32,
                "quantity": 1,
                "image": "https://www.investcroc.com/logos/GOOGL.webp"
            }
        ]
    };
}