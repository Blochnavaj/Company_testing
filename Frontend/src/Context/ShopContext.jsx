import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fees = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItem, setCartItem] = useState({});
    const [products, setProducts] = useState([]);

    const addToCart = (itemId) => {
        setCartItem((prevCart) => ({
            ...prevCart,
            [itemId]: (prevCart[itemId] || 0) + 1
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItem((prevCart) => {
            const updatedCart = { ...prevCart };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
            return updatedCart;
        });
    };

    const deleteFromCart = (itemId) => {
        setCartItem((prevCart) => {
            const newCart = { ...prevCart };
            delete newCart[itemId];
            return newCart;
        });
    };

    const getCartCount = () => {
        return Object.values(cartItem).reduce((total, count) => total + count, 0);
    };

    const getProductData = async () => {
        try {
            console.log("Fetching product data...");
            const response = await axios.get(`${backendUrl}/api/v1/list`);
            console.log("API Response:", response.data);

            if (response.data.success) {
                console.log("Products before setting state:", response.data.products);
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching products:", error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    const value = {
        products,
        currency,
        delivery_fees,
        backendUrl,
        search, setSearch,
        showSearch, setShowSearch,
        cartItem, addToCart, getCartCount, getProductData,
        deleteFromCart, removeFromCart
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;