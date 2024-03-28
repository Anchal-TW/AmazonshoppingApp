import React, {createContext, useContext, useState} from 'react';

export interface AddedItem {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItem: AddedItem[];
  addToCart: (item: AddedItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  addQty: (itemId: Number) => void;
  countQty: number;
  decreaseQty: (itemId: Number) => void;
}

const Cartcontext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(Cartcontext);
  if (!context) {
    throw new Error('useCart must be used within a cartprovider');
  }
  return context;
};

export function CartProvider({children}: {children: React.ReactNode}) {
  const [cartItem, setCartItem] = useState<AddedItem[]>([]);
  const [countQty, setCountQty] = useState(1);

  const addToCart = (item: AddedItem) => {
    const isItemInWishlist = cartItem.some(cartItem => cartItem.id === item.id);
    if (!isItemInWishlist) {
      setCartItem(prevCart => [...prevCart, item]);
    }
  };
  const removeFromCart = (id: number) => {
    setCartItem(prevWishlist => prevWishlist.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItem([]);
  };

  const addQty = (itemId: Number) => {
    const itemIndex = cartItem.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      const updatedCartItem = [...cartItem];
      updatedCartItem[itemIndex].quantity += 1;
      setCartItem(updatedCartItem);
    }
  };

  const decreaseQty = (itemId: Number) => {
    const itemIndex = cartItem.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      const updatedCartItem = [...cartItem];
      updatedCartItem[itemIndex].quantity -= 1;
      setCartItem(updatedCartItem);
    }
  };

  const value: CartContextType = {
    cartItem,
    addToCart,
    removeFromCart,
    clearCart,
    addQty,
    countQty,
    decreaseQty,
  };

  return <Cartcontext.Provider value={value}>{children}</Cartcontext.Provider>;
}
