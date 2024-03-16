"use client";
// components/ResetCart.js (Client Component)

import { useEffect } from "react";
import { useResetCart } from "./cart-store";

const ResetCart = ({ vendorId }: { vendorId: string }) => {
  const { resetCart } = useResetCart();

  useEffect(() => {
    resetCart();
  }, [vendorId, resetCart]);

  return null; // This component does not need to render anything
};

export default ResetCart;
