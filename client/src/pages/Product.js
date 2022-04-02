import React, { useEffect } from "react";
import ProductBanner from "../component/productpage/ProductBanner";
import ProductItem from "../component/productpage/ProductItem";

const Product = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <ProductBanner />
      <ProductItem />
    </div>
  );
};

export default Product;
