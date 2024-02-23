import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        securities: [
            {
                name: "AMZN",
                price: 100,
                positive_case: 2.5,
                negative_case: 30.0,
                neutral_case: 5.0,
                buy_date: "2021-01-01",
            },
            {
                name: "AAPL",
                price: 200,
                positive_case: 10.0,
                negative_case: 20.0,
                neutral_case: 5.0,
                buy_date: "2021-01-01",
            },
            {
                name: "GOOGL",
                price: 100,
                positive_case: 15.0,
                negative_case: 40.0,
                neutral_case: 10.0,
                buy_date: "2021-01-01",
            }
        ]
    };
}