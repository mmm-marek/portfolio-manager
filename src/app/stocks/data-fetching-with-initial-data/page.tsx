import StockTableWithInitialData from "@/components/StockTableWithInitialData";
import { getStocks } from "@/services/stock/actions";

// In many cases we want to allow the user to interact with our data (f.e. sorting, filtering, etc.)
// To achieve both the server-side rendering and the client-side interactivity,
// we can fetch the data on the server and set them as initial data for the client
// using the initialData prop of the useQuery hook.
// Problem with this approach is props drilling and worse developer experience.
const DataFetchingWithInitialDataPage = async () => {
    const stocks = await getStocks();

    return (
        <div>
            <h1>Data fetching with initial data</h1>
            <StockTableWithInitialData stocks={stocks} />
        </div>
    );
};

export default DataFetchingWithInitialDataPage;
