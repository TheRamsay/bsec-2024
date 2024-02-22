import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        securities: [
            {
                name: "AMZN",
                price: 3456.32,
                positive_case: -15.0,
                negative_case: 30.0,
                neutral_case: 5.0,
            },
            {
                name: "AAPL",
                price: 123.32,
                positive_case: -10.0,
                negative_case: 20.0,
                neutral_case: 5.0,
            },
            {
                name: "GOOGL",
                price: 2345.32,
                positive_case: -20.0,
                negative_case: 40.0,
                neutral_case: 10.0,
            }
        ]
    };
}