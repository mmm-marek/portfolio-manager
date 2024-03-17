import StockTableWithHydration from "@/components/StockTableWithHydration";
import { getStocks } from "@/services/stock/actions";
import { queryKeys } from "@/utils/queryKeyFactory";
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import { Spin } from "antd";
import { Suspense } from "react";

const FetchingWithHydrationPage = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: queryKeys.stocks.all,
        queryFn: getStocks,
    });

    return (
        <div>
            <h1>Fetching with hydration page</h1>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<Spin spinning />}>
                    <StockTableWithHydration />
                </Suspense>
            </HydrationBoundary>
        </div>
    );
};

export default FetchingWithHydrationPage;
