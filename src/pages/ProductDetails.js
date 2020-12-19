import React from "react";
import { useParams, useHistory } from 'react-router-dom';
import { ProductContext } from '../context/products';
import { CartContext } from '../context/cart';
import Loading from '../components/Loading';

export default function ProductDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { products } = React.useContext(ProductContext);
  const { addToCart } = React.useContext(CartContext);
  const product = products.find(item => item.id === parseInt(id));

  if (product.length === 0) {
    return <Loading></Loading>
  } else {
    const { image: { url }, title, price, description } = product;
    return <section className="single-product">
      <img src={url} alt={title} className="single-product-image"></img>

      <article>
        <h1>{title}</h1>
        <h2>{price}</h2>
        <p>{description}</p>
        <button className="btn btn-primary btn-block"
          onClick={() => {
            //ad to cart
            addToCart(product)
            history.push("/cart");
          }}>add to cart</button>
      </article>
    </section>
  }

}
