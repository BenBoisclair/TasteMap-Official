"use client";
import { Promotion, promotion } from "@/db/schema/schema";
import { useOfferStore } from "@/utils/store";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export type PromotionSchema = {
  id: string;
  name: string;
  nameTH: string;
  description: string;
  descriptionTH: string;
  price: number;
  quantity: number;
};

const PromotionItem = (promotion: Promotion) => {
  const { addPromotion, updateQuantity } = useOfferStore();
  const quantity = useOfferStore(
    (state) =>
      state.promotions.find((p) => p.id === promotion.id)?.quantity || 0
  );

  const promotionSchema = {
    id: promotion.id,
    name: promotion.name,
    nameTH: promotion.nameTH || "",
    description: promotion.description,
    descriptionTH: promotion.descriptionTH || "",
    price: promotion.price || 0,
  };

  const increment = () => {
    if (quantity === 10) return;
    addPromotion({ ...promotionSchema, quantity: 1 });
  };
  const decrement = () => {
    if (quantity < 1) return;
    updateQuantity(promotion.id, quantity - 1);
  };

  return (
    <div key={promotion.id}>
      <div className="flex items-center justify-between mt-5">
        <div className="rounded-full p-2 bg-neutral-300">
          <Image
            alt={`Promotion and Discounts`}
            src={`/icons/promotion_icon.png`}
            width={40}
            height={40}
          />
        </div>
        <div className="mx-2">
          <h4 className="font-medium">{promotion.name}</h4>
          <p className="text-sm">{promotion.description}</p>
        </div>
        <div className="flex items-center gap-4">
          {!!promotion.price && (
            <div>
              <p className=" text-neutral-400 font-medium">{`${promotion.price}฿`}</p>
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

export default PromotionItem;
