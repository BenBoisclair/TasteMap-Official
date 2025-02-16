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
  products: Product[];
  promotions: Promotion[];
  vendorId: string;
  additionalInfo: string;
  setAdditionalInfo: (additionalInfo: string) => void;
  setVendorId: (vendorId: string) => void;
  addPromotion: (promotion: Promotion) => void;
  removePromotion: (promotionId: string) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  reset: () => void;
  getTotalPrice: () => number;
}

export const useOfferStore = create<OfferStore>((set, get) => ({
  products: [],
  promotions: [],
  vendorId: "",
  additionalInfo: "",
  setAdditionalInfo: (additionalInfo) => set({ additionalInfo }),
  setVendorId: (vendorId) => set({ vendorId }),
  addPromotion: (promotion) =>
    set((state) => {
      const existingPromotion = state.promotions.find(
        (p) => p.id === promotion.id
      );
      if (existingPromotion) {
        return {
          promotions: state.promotions.map((p) =>
            p.id === promotion.id
              ? { ...p, quantity: p.quantity + promotion.quantity }
              : p
          ),
        };
      } else {
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
        return {
          products: state.products.map((p) =>
            p.id === product.id
              ? { ...p, quantity: p.quantity + product.quantity }
              : p
          ),
        };
      } else {
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
        .filter((product) => product.quantity > 0),
      promotions: state.promotions
        .map((promotion) =>
          promotion.id === id ? { ...promotion, quantity } : promotion
        )
        .filter((promotion) => promotion.quantity > 0),
    })),
  reset: () =>
    set({ vendorId: "", products: [], promotions: [], additionalInfo: "" }),
  getTotalPrice: () => {
    const state = get();
    const totalProductPrice = state.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const totalPromotionPrice = state.promotions.reduce(
      (total, promotion) => total + promotion.price * promotion.quantity,
      0
    );
    return totalProductPrice + totalPromotionPrice;
  },
}));

// Helper functions that don't use hooks
export const getStoreState = () => useOfferStore.getState();

// Modified VendorView component usage
export const initializeVendor = (vendorId: string) => {
  const store = getStoreState();
  store.setVendorId(vendorId);
};

// Usage in components remains the same
export const useResetCart = () => {
  const reset = useOfferStore((state) => state.reset);
  return { resetCart: reset };
};
