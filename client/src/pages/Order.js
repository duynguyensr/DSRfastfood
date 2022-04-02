import React, { useEffect } from "react";
import OderBanner from "../component/orderpage/OderBanner";
import OrderHistory from "../component/orderpage/OrderHistory";

const Order = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <OderBanner />
      <OrderHistory />
    </>
  );
};

export default Order;
