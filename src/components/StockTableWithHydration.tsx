"use client";
import { getStocks } from "@/services/stock/actions";
import { queryKeys } from "@/utils/queryKeyFactory";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";

const StockTableWithHydration = () => {
    const { data, isPending, isError } = useQuery({
        queryKey: [queryKeys.stocks.all],
        queryFn: getStocks,
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

export default StockTableWithHydration;
