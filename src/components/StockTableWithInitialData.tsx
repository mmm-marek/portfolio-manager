"use client";
import { getStocks } from "@/services/stock/actions";
import { queryKeys } from "@/utils/queryKeyFactory";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";

type StockTableWithInitialDataProps = {
    stocks: Awaited<ReturnType<typeof getStocks>>;
};

const StockTableWithInitialData = ({
    stocks,
}: StockTableWithInitialDataProps) => {
    const { data, isPending, isError } = useQuery({
        queryKey: [queryKeys.stocks],
        queryFn: getStocks,
        initialData: stocks,
    });

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ticker Symbol",
            dataIndex: "tickerSymbol",
            key: "tickerSymbol",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
    ];

    if (isPending) return <div>Loading...</div>;

    if (isError) return <div>Error fetching data</div>;

    return <Table dataSource={data} columns={columns} rowKey={"id"} />;
};

export default StockTableWithInitialData;
