import "./App.css";
import Products from "./components/Products";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cartProds, setCartProds] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        let response = await axios.get(
          `https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[])

  return (
    <div className="App">
      <Routes>
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartProds}
              setCartItems={setCartProds}
              products={products}
              setProducts={setProducts}
            />
          }
        />
        <Route
          path="/"
          element={
            <Products
              cartItems={cartProds}
              setCartItems={setCartProds}
              products={products}
              setProducts={setProducts}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
