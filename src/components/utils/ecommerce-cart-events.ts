export function getCartItems() {
  return JSON.parse(localStorage.getItem('cartItems') || '[]');
}

export function showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
  window.dispatchEvent(new CustomEvent('cart-toast', { detail: { message, type } }));
}

export function setCartItems(items: any[], toast?: { message: string, type: 'success' | 'error' | 'info' }) {
  localStorage.setItem('cartItems', JSON.stringify(items));
  window.dispatchEvent(new Event('cart-changed'));
  if (toast) showToast(toast.message, toast.type);
}

export function addToCart(product: any, quantity: number = 1) {
  const cartItems = getCartItems();
  const idx = cartItems.findIndex((item: any) => item.id === product.id);
  let newCart;
  if (idx > -1) {
    newCart = [...cartItems];
    newCart[idx] = { ...newCart[idx], quantity: newCart[idx].quantity + quantity };
    setCartItems(newCart, { message: 'Se agregaron más unidades al carrito', type: 'success' });
  } else {
    newCart = [...cartItems, { ...product, quantity }];
    setCartItems(newCart, { message: 'Producto añadido al carrito', type: 'success' });
  }
  return newCart;
}

export function removeFromCart(index: number) {
  const cartItems = getCartItems();
  const newCart = [...cartItems];
  newCart.splice(index, 1);
  setCartItems(newCart, { message: 'Producto eliminado del carrito', type: 'error' });
  return newCart;
}
