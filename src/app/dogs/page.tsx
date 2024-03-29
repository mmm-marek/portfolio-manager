import { getStocks } from "@/services/stock/actions";

export const revalidate = 10;

const DogsPage = async () => {
    const stocks = await getStocks();

    return (
        <div>
            <h1>Dogs</h1>
            <p>{Math.random()}</p>
            <div>
                {stocks.map((stock) => (
                    <div key={stock.id}>
                        <h2>{stock.name}</h2>
                        <p>{stock.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DogsPage;
