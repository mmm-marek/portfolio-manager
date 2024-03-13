"use server";
import { db, sql } from "./schema";

export const seed = async () => {
    const dropTable = await db.schema.dropTable("user").ifExists().execute();

    console.log(`Dropped "users" table`);

    const dropStockTable = await db.schema
        .dropTable("stock")
        .ifExists()
        .execute();

    console.log(`Dropped "stock" table`);

    const createUserTable = await db.schema
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

    const createStockTable = await db.schema
        .createTable("stock")
        .ifNotExists()
        .addColumn("id", "uuid", (cb) =>
            cb.primaryKey().defaultTo(sql`gen_random_uuid()`)
        )
        .addColumn("name", "varchar(255)", (cb) => cb.notNull())
        .addColumn("tickerSymbol", "varchar(255)", (cb) =>
            cb.notNull().unique()
        )
        .addColumn("price", "decimal(10, 2)", (cb) => cb.notNull())
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

    console.log(`Created "stock" table`);

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

    const insertStocks = await db
        .insertInto("stock")
        .values([
            {
                name: "Apple",
                tickerSymbol: "AAPL",
                price: 123.45,
            },
            {
                name: "Microsoft",
                tickerSymbol: "MSFT",
                price: 234.56,
            },
            {
                name: "Google",
                tickerSymbol: "GOOGL",
                price: 345.67,
            },
            {
                name: "Amazon",
                tickerSymbol: "AMZN",
                price: 456.78,
            },
            {
                name: "Facebook",
                tickerSymbol: "FB",
                price: 567.89,
            },
            {
                name: "Tesla",
                tickerSymbol: "TSLA",
                price: 678.9,
            },
            {
                name: "Netflix",
                tickerSymbol: "NFLX",
                price: 789.01,
            },
            {
                name: "Nvidia",
                tickerSymbol: "NVDA",
                price: 890.12,
            },
            {
                name: "Paypal",
                tickerSymbol: "PYPL",
                price: 901.23,
            },
            {
                name: "Adobe",
                tickerSymbol: "ADBE",
                price: 123.45,
            },
        ])
        .execute();

    console.log(`Inserted 10 stocks`);
};
