"use client";
import { Product } from "@/db/schema/schema";
import { useOfferStore } from "@/utils/store";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export type ProductSchema = {
  id: string;
  name: string;
  nameTH: string;
  price: number;
  quantity: number;
};

const ProductItem = (product: Product) => {
  const { addProduct, updateQuantity } = useOfferStore();
  const quantity = useOfferStore(
    (state) => state.products.find((p) => p.id === product.id)?.quantity || 0
  );

  const productSchema = {
    id: product.id,
    name: product.name,
    nameTH: product.nameTH || "",
    price: product.price || 0,
  };

  const increment = () => {
    if (quantity === 10) return;
    addProduct({ ...productSchema, quantity: 1 });
  };
  const decrement = () => {
    if (quantity < 1) return;
    updateQuantity(product.id, quantity - 1);
  };

  return (
    <div key={product.id}>
      <div className="flex items-center justify-between mt-5">
        <div>
          <h4 className="font-medium text-[15px]">{product.name}</h4>
        </div>
        <div className="flex items-center gap-4">
          {!!product.price && (
            <div>
              <p className=" text-neutral-400 font-medium">{`${product.price}฿`}</p>
            </div>
          )}
          <div className="flex items-center gap-2">
            <button
              className="bg-neutral-300 rounded-full p-0.5"
              onClick={decrement}>
              <Minus size={15} />
            </button>
            <p>{quantity}</p>
            <button
              className="bg-neutral-400 rounded-full p-0.5"
              onClick={increment}>
              <Plus size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
