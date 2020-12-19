// cart context
import React from 'react';
import localCart from '../utils/localCart';


function getCartFromLocalStorage() {
  return localStorage.getItem('cart') ?
    JSON.parse(localStorage.getItem('cart')) : []
}

const CartContext = React.createContext();

function CartProvider({ children }) {
  const [cart, setCart] = React.useState(getCartFromLocalStorage());
  const [total, setTotal] = React.useState(0);
  const [cartItems, setCartItems] = React.useState(0);

  React.useEffect(() => {
    //local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    //cartitems
    let newCartItems = cart.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);
    setCartItems(newCartItems)

    //cart total
    let newTotal = cart.reduce((acc, curr) => {
      return acc + curr.amount * curr.price;
    }, 0);
    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);
  }, [cart])

  //////////////////
  const removeItem = id => {
    setCart([...cart].filter((item) => {
      return item.id !== id;
    }))
  }
  const increaseAmount = id => {
    const newCart = [...cart].map(item => {
      return item.id === id ? { ...item, amount: item.amount + 1 } : { ...item };
    })
    setCart(newCart);
  }
  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      removeItem(id);
      return;
    }
    const newCart = [...cart].map(item => {
      return item.id === id ? { ...item, amount: item.amount - 1 } : { ...item };
    })
    setCart(newCart);
  }
  const addToCart = product => {
    const { id, image: { url }, title, price } = product;
    const item = [...cart].find(item => item.id === id);
    if (item) {
      increaseAmount(id);
      return;
    }
    //not in cart
    const newItem = { id, image: url, title, price, amount: 1 };
    const newCart = [...cart, newItem];
    setCart(newCart);
  }
  const clearCart = id => {
    setCart([]);
  }

  return <CartContext.Provider value={{
    cart, total, cartItems, removeItem,
    increaseAmount, decreaseAmount, addToCart, clearCart
  }}>
    {children}
  </CartContext.Provider>
}

export { CartContext, CartProvider };
