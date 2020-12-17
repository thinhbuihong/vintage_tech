import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Abount from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';


export default function App() {
  return (<Router>
    <Switch>
      <Route path="/" exact>
        <Home></Home>
      </Route>

      <Route path="/about">
        <Abount></Abount>
      </Route>

      <Route path="/cart">
        <Cart></Cart>
      </Route>

      <Route path="/checkout">
        <Checkout></Checkout>
      </Route>

      <Route path="/login">
        <Login></Login>
      </Route>

      <Route path="/products">
        <Products></Products>
      </Route>

      <Route path="/products/:id" children={<ProductDetails></ProductDetails>}>
      </Route>

      <Route path="*">
        <Error></Error>
      </Route>

    </Switch>
  </Router>);
}
