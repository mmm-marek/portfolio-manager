"use server";

import { Stock, db } from "@/database/schema";

export const getAllStock = async (): Promise<Stock[]> => {
    try {
        const stocks = await db.selectFrom("stock").selectAll().execute();
        return stocks;
    } catch (error) {
        console.error("Failed to get all stocks", error);
        throw new Error("Failed to get all stocks");
    }
};

export const getStockByTickerSymbol = async (
    tickerSymbol: string
): Promise<Stock | undefined> => {
    try {
        const stock = await db
            .selectFrom("stock")
            .selectAll()
            .where("tickerSymbol", "=", tickerSymbol)
            .executeTakeFirst();
        return stock;
    } catch (error) {
        console.error("Failed to get stock", error);
        throw new Error("Failed to get stock");
    }
};

export const createStock = async ({
    name,
    tickerSymbol,
    price,
}: Stock): Promise<Stock | undefined> => {
    try {
        const stock = await db
            .insertInto("stock")
            .values({
                name,
                tickerSymbol,
                price,
            })
            .returningAll()
            .executeTakeFirst();
        return stock;
    } catch (error) {
        console.error("Failed to create stock", error);
        throw new Error("Failed to create stock");
    }
};
