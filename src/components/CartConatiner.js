import React from 'react';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { openModel } from '../feature/modal/modalSlice';

const CartConatiner = () => {
    const dispatch = useDispatch();
    const { cartItems, total, amount } = useSelector((state) => state.cart)
    if (amount < 1) {
        return (<section className='cart'>
            <header>
                <h2> Your Bag</h2>
                <h4 className='empty-cart'>is currently empty</h4>
            </header>
        </section>)
    }

    return (
        <section className='cart'>
            <header>
                <h2>Your Bag</h2>
            </header>
            <div>
                {cartItems.map((item, index) => {
                    return <CartItem key={item.id} {...item} />
                })}
            </div>
            <footer>
                <hr />
                <div className='cart-total'>
                    <h4>Total.
                        <span>${total.toFixed()}</span>
                    </h4>
                </div>
                <button onClick={() => dispatch(openModel())} className='btn clear-btn'>Clear cart</button>
            </footer>
        </section>
    )
}

export default CartConatiner