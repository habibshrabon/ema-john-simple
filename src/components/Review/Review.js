import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);

    const handelRemoveProduct = (productkeys) => {
        // console.log("clicked product", productkeys);
        const newCart = cart.filter(pd => pd.key !== productkeys);
        setCart(newCart);
        removeFromDatabaseCart(productkeys);
    }

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        // console.log(savedCart);//review inside
        const productkeys = Object.keys(savedCart);
        // console.log(productkeys);

        const cartProducts = productkeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, [])
    return (
        <div className="twin-container">
            {/* <h1>Cart Items: {cart.length}</h1> */}
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                        key={pd.key}
                        handelRemoveProduct={handelRemoveProduct}
                        product={pd}
                    ></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Review;