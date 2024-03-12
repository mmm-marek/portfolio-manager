import { createKysely } from "@vercel/postgres-kysely";
import { UUID } from "crypto";
import {
    CamelCasePlugin,
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from "kysely";

interface UserTable {
    id: Generated<UUID>;
    name: string;
    email: string;
    password: string;
    createdAt: ColumnType<Date, string | undefined, never>;
    modifiedAt: ColumnType<Date, string | undefined, never>;
    deletedAt: ColumnType<Date | null, string | undefined, never>;
}

interface StockTable {
    id: Generated<UUID>;
    name: string;
    tickerSymbol: string;
    price: number;
    createdAt: ColumnType<Date, string | undefined, never>;
    modifiedAt: ColumnType<Date, string | undefined, never>;
    deletedAt: ColumnType<Date | null, string | undefined, never>;
}

export type User = Selectable<UserTable>;
export type InsertUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;

export type Stock = Selectable<StockTable>;
export type InsertStock = Insertable<StockTable>;
export type UpdateStock = Updateable<StockTable>;

interface Database {
    user: UserTable;
    stock: StockTable;
}

export const db = createKysely<Database>(undefined, {
    plugins: [new CamelCasePlugin()],
});

export { sql } from "kysely";
