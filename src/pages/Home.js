const Home = () => {

    return (
        <>
            <div className="bg-gray-600 min-h-screen flex flex-col items-center">
            <div className="flex flex-col max-w-[600px] items-center mt-20 p-6 gap-10 text-center">
                <h2 className="text-3xl text-white">Largest Crypto Marketplace</h2>

                <p className="text-white">
                Welcome to the world's largest cryptocurrency marketplace. 
                Sign up to explore more about cryptos.
                </p>

                <form className="flex gap-2">
                <input type="text" placeholder="Search Crypto"
                    className="px-4 py-2 rounded-md"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Search
                </button>
                </form>
            </div>
            <div>
            <table border="1" className="w-full text-sm text-left rtl:text-right bg-white">
                    <thead className="uppercase dark:text-black-900">
                    <tr>
                        <th scope="col" className="px-4 py-3"> # </th>
                        <th scope="col" className="px-4 py-3"> Coins </th>
                        <th scope="col" className="px-4 py-3"> Price </th>
                        <th scope="col" className="px-4 py-3"> 24H Change </th>
                        <th scope="col" className="px-4 py-3"> Market Cap </th>
                    </tr>
                    </thead>
                    
                </table>
            </div>
            </div>

        </>
    )

}

export default Home;
