import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/product";
import ProductItem from "./ProductItem";
import { RootState, AppDispatch } from "../redux/store";

function ProductList() {
  const dispatch: AppDispatch = useDispatch();
  const { items, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  let content;

  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    content = items.map((product) => (
      <ProductItem key={product.id} product={product} />
    ));
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div className="productList">
      <h2>Products</h2>
      {content}
    </div>
  );
}

export default ProductList;
