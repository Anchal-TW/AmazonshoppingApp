import React, {createContext, useContext, useState} from 'react';

interface User {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: {rate: number; count: number};
}

interface WishlistContextType {
  wishlist: User[];
  addToWishlist: (item: User) => void;
  clearWishlist: () => void;
  removeFromWishlist: (id: number) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [wishlist, setWishlist] = useState<User[]>([]);

  const addToWishlist = (item: User) => {
    const isItemInWishlist = wishlist.some(
      wishlistItem => wishlistItem.id === item.id,
    );
    if (!isItemInWishlist) {
      setWishlist(prevWishlist => [...prevWishlist, item]);
    }
  };
  const removeFromWishlist = (id: number) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== id));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const value: WishlistContextType = {
    wishlist,
    addToWishlist,
    clearWishlist,
    removeFromWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
