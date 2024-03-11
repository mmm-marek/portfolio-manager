import { createKysely } from "@vercel/postgres-kysely";
import { CamelCasePlugin, ColumnType, Generated } from "kysely";

interface UserTable {
    id: Generated<number>;
    name: string;
    email: string;
    password: string;
    createdAt: ColumnType<Date, string | undefined, never>;
    modifiedAt: ColumnType<Date, string | undefined, never>;
    deletedAt: ColumnType<Date | null, string | undefined, never>;
}

interface Database {
    user: UserTable;
}

export const db = createKysely<Database>(undefined, {
    plugins: [new CamelCasePlugin()],
});

export { sql } from "kysely";
