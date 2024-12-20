import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subtotal: number;
    countItemsCart: number;
    impuestos: number;
    total: number;
  };
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      //   Methods

      getTotalItems: () => {
        const { cart } = get();

        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      getSummaryInformation: () => {
        const { cart } = get();

        const subtotal = cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        const countItemsCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        const impuestos = subtotal * 0.15;
        const total = subtotal + impuestos;
        return {
          subtotal,
          countItemsCart,
          impuestos,
          total,
        };
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // Revisemos si el producto existe en el carrito
        const productsInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        //Si no existe hacemos una copia del carrito actual y agregamos el nuevo producto
        if (!productsInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        //Revisamos si el producto ya existe con la misma talla solo incrementamos la cantidad
        const updateCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updateCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        console.log({ product, quantity });
        const { cart } = get();
        //Revisamos si el producto ya existe con la misma talla solo incrementamos la cantidad
        const updateQuantityProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updateQuantityProduct });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const newCart = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );
        set({ cart: newCart });
      },
      clearCart:()=>{
        set({ cart: [] });
      }
    }),
    { name: "shopping-cart" }
  )
);
