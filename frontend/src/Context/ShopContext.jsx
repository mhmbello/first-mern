import React, { createContext, use } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for(let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {

    const [all_product, setAllProduct] = React.useState([]);
    const [cartItems, setCartItems] = React.useState(getDefaultCart());

    React.useEffect(() => {
      fetch("http://localhost:4000/api/products/allproducts")
      .then(res => res.json())
      .then(data => {setAllProduct(data)})

      if(localStorage.getItem("auth-token")){
        fetch("http://localhost:4000/api/cart/getcart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`
          }
        })
        .then((res) => res.json())
        .then((data) => {
          setCartItems(data.cartData);
        });
      }
    }, []);

    const addToCart = (itemId) => {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      if(localStorage.getItem("auth-token")){
        fetch("http://localhost:4000/api/cart/addtocart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`
          },
          body: JSON.stringify({itemId: itemId})
        })
        .then((res) => res.json())
        .then((data) => console.log(data));
      }
    };

    const removeFromCart = (itemId) => {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      if(localStorage.getItem("auth-token")){
        fetch("http://localhost:4000/api/cart/removefromcart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`
          },
          body: JSON.stringify({itemId: itemId})
        })
        .then((res) => res.json())
        .then((data) => console.log(data));
      }
    };

    const getTotalCartAmount = () => {
      let totalAmount = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = all_product.find((product) => product.id === Number(item));
          totalAmount += cartItems[item] * itemInfo.new_price;
        }
      }
      return totalAmount;
    };

    const getTotalCartItems = () => {
      let totalItems = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          totalItems += cartItems[item];
        }
      }
      return totalItems;
    };

    const contextValue = {all_product, cartItems, setCartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
