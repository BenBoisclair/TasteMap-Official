import { desc } from "@/db";
import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  nameTH: string;
  price: number;
  quantity: number;
}

interface Promotion {
  id: string;
  name: string;
  nameTH: string;
  description: string;
  descriptionTH: string;
  price: number;
  quantity: number;
}

interface OfferStore {
  vendorId: string;
  setVendorId: (vendorId: string) => void;
  promotions: Promotion[];
  addPromotion: (promotion: Promotion) => void;
  removePromotion: (promotionId: string) => void;
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  reset: () => void;
  getTotalPrice: () => number;
}

export const useOfferStore = create<OfferStore>((set) => ({
  vendorId: "",
  setVendorId: (vendorId) => set({ vendorId }),
  products: [],
  promotions: [],
  addPromotion: (promotion) =>
    set((state) => {
      const existingPromotion = state.promotions.find(
        (p) => p.id === promotion.id
      );
      if (existingPromotion) {
        // If the promotion exists, just update the quantity
        return {
          promotions: state.promotions.map((p) =>
            p.id === promotion.id
              ? { ...p, quantity: p.quantity + promotion.quantity }
              : p
          ),
        };
      } else {
        // If the promotion doesn't exist, add it to the cart
        return { promotions: [...state.promotions, promotion] };
      }
    }),
  removePromotion: (promotionId) =>
    set((state) => ({
      promotions: state.promotions.filter(
        (promotion) => promotion.id !== promotionId
      ),
    })),

  addProduct: (product) =>
    set((state) => {
      const existingProduct = state.products.find((p) => p.id === product.id);
      if (existingProduct) {
        // If the product exists, just update the quantity
        return {
          products: state.products.map((p) =>
            p.id === product.id
              ? { ...p, quantity: p.quantity + product.quantity }
              : p
          ),
        };
      } else {
        // If the product doesn't exist, add it to the cart
        return { products: [...state.products, product] };
      }
    }),

  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      products: state.products
        .map((product) =>
          product.id === id ? { ...product, quantity } : product
        )
        .filter((product) => product.quantity > 0), // Remove the product if the quantity is 0
      promotions: state.promotions
        .map((promotion) =>
          promotion.id === id ? { ...promotion, quantity } : promotion
        )
        .filter((promotion) => promotion.quantity > 0), // Remove the promotion if the quantity is 0
    })),
  reset: () => set({ vendorId: "", products: [] }),
  getTotalPrice: () => {
    const totalProductPrice: number = useOfferStore
      .getState()
      .products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    const totalPromotionPrice: number = useOfferStore
      .getState()
      .promotions.reduce(
        (total, promotion) => total + promotion.price * promotion.quantity,
        0
      );
    return totalProductPrice + totalPromotionPrice;
  },
}));

export const useResetCart = () => {
  const reset = useOfferStore((state) => state.reset);

  return { resetCart: reset };
};

export const setVendorId = (vendorId: string) => {
  const setVendorId = useOfferStore((state) => state.setVendorId);
  setVendorId(vendorId);
};
