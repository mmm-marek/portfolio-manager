import { createKysely } from "@vercel/postgres-kysely";
import { UUID } from "crypto";
import {
    CamelCasePlugin,
    ColumnType,
    Generated,
    Insertable,
    Selectable,
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

export type User = Selectable<UserTable>;
export type InsertUser = Insertable<UserTable>;

interface Database {
    user: UserTable;
}

export const db = createKysely<Database>(undefined, {
    plugins: [new CamelCasePlugin()],
});

export { sql } from "kysely";
