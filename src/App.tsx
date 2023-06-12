import React from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import ProductItem from "./components/ProductItem";

function App() {
  return (
    <div className="App">
      Redux ToolKit - Async
      <div className="productList">
        <ProductList />
      </div>
    </div>
  );
}

export default App;
