import { z } from "zod";

export const createStockSchema = z.object({
    name: z.string(),
    tickerSymbol: z.string(),
    price: z.number(),
});
