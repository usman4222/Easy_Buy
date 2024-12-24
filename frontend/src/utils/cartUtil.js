export const isCartReadyForCheckout = (cartItems) => {
    const cartItemsInLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
  
    return cartItems.length === 0 && (!cartItemsInLocalStorage || cartItemsInLocalStorage.length === 0);
  };