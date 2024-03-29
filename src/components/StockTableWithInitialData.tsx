"use client";
import { getStocks } from "@/services/stock/actions";
import { queryKeys } from "@/utils/queryKeyFactory";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Table } from "antd";

type StockTableWithInitialDataProps = {
    stocks: Awaited<ReturnType<typeof getStocks>>;
};

const StockTableWithInitialData = ({
    stocks,
}: StockTableWithInitialDataProps) => {
    const queryClient = useQueryClient();
    const { data, isPending, isError } = useQuery({
        queryKey: [queryKeys.stocks.all],
        queryFn: async () => getStocks(),
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

    return (
        <div>
            <button
                onClick={() => {
                    queryClient.invalidateQueries({
                        queryKey: [queryKeys.stocks.all],
                    });
                }}>
                Button
            </button>
            <Table dataSource={data} columns={columns} rowKey={"id"} />
        </div>
    );
};

export default StockTableWithInitialData;
