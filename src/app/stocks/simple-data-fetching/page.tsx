import StockTable from "@/components/StockTable";
import { Spin } from "antd";
import { Suspense } from "react";

const SimpleDataFetchingPage = () => {
    return (
        <div>
            <h1>Simple Data Fetching</h1>
            <Suspense fallback={<Spin spinning />}>
                <StockTable />
            </Suspense>
        </div>
    );
};

export default SimpleDataFetchingPage;
