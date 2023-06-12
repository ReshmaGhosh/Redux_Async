import React from "react";
import { Product } from "../redux/slices/product";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="productItem">
      <h3>{product.title}</h3>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductItem;
