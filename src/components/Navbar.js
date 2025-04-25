import logo from "../images/logo.png";

const Navbar = () => {
    return (
        <>
            <nav className="bg-gray-700 text-white shadow-md">
                <div className="container mx-auto flex items-center justify-between px-6 py-3 ml-20">
                    <div className="flex items-center space-x-3">
                        <img src={logo} alt="logo" className="h-10 w-10 rounded-full" />
                        <h3 className="text-xl font-bold"> Crypto Hunter</h3>
                    </div>

                    {/* <ul className="flex space-x-6">
                        <li>
                        <Link to="/"
                        className="hover:text-blue-300 transition-colors duration-200 text-base font-medium">
                        Home
                        </Link>
                        </li>
                        <li>
                            <Link to="/register"
                            className="hover:text-blue-300 transition-colors duration-200 text-base font-medium">
                            Register
                            </Link>
                        </li>
                        <li>
                            <Link to="/signin"
                            className="hover:text-blue-300 transition-colors duration-200 text-base font-medium">
                            Signin
                            </Link>
                        </li>
                    </ul> */}
                    <select className="text-black mr-20 p-2" onChange={currencyHandler}>
                        <option value="USD"> USD </option>
                        <option value="INR"> INR </option>
                        <option value="EUR"> EUR </option>
                    </select>
                </div>
            </nav>
        </>
    )
}

export default Navbar;