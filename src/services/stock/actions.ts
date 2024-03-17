"use server";

import { getAllStock } from "@/database/repositories/stockRepository";

export const getStocks = async () => {
    return await getAllStock();
};
