import { getStock } from "@/services/stock/actions";
import { Table } from "antd";

const StockTable = async () => {
    const stocks = await getStock();

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

    return <Table dataSource={stocks} columns={columns} rowKey={"id"} />;
};

export default StockTable;
