import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import "./Product.css";

const Product = (props) => {
    // console.log(props);
    const {img, name,seller,price,stock} = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br/>
                <p><small>by: {seller}</small></p>
                <p>$ {price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>
                <button className="main-btn" onClick={() =>props.handelAddProduct(props.product)}><FontAwesomeIcon icon={faCartArrowDown}/> add to cart</button>
            </div>
            
        </div>
    );
};

export default Product;<h3>THis is a product</h3>