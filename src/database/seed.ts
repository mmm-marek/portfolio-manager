"use server";
import { db, sql } from "./schema";

export async function seed() {
    const dropTable = await db.schema.dropTable("user").ifExists().execute();

    const createTable = await db.schema
        .createTable("user")
        .ifNotExists()
        .addColumn("id", "uuid", (cb) =>
            cb.primaryKey().defaultTo(sql`gen_random_uuid()`)
        )
        .addColumn("name", "varchar(255)", (cb) => cb.notNull())
        .addColumn("email", "varchar(255)", (cb) => cb.notNull().unique())
        .addColumn("password", "varchar(255)", (cb) => cb.notNull())
        .addColumn("createdAt", sql`timestamp with time zone`, (cb) =>
            cb.defaultTo(sql`current_timestamp`)
        )
        .addColumn("modifiedAt", sql`timestamp with time zone`, (cb) =>
            cb.defaultTo(null)
        )
        .addColumn("deletedAt", sql`timestamp with time zone`, (cb) =>
            cb.defaultTo(null)
        )
        .execute();
    console.log(`Created "users" table`);

    const insertUsers = await db
        .insertInto("user")
        .values([
            {
                name: "Test Name",
                email: "test@test.com",
                password: "password1",
            },
            {
                name: "Test Name 2",
                email: "test2@test.com",
                password: "password2",
            },
            {
                name: "Test Name 3",
                email: "test3@test.com",
                password: "password3",
            },
        ])
        .execute();
    console.log(`Inserted 3 users`);
}
