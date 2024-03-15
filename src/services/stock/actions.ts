"use server";

import { getAllStock } from "@/database/repositories/stockRepository";

export const getStock = async () => {
    return await getAllStock();
};
