export const isCartReadyForCheckout = (cartItems) => {
    const cartItemsInLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
  
    // Check if cartItems is empty in Redux or localStorage
    return cartItems.length === 0 && (!cartItemsInLocalStorage || cartItemsInLocalStorage.length === 0);
  };