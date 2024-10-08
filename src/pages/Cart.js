import React, { useEffect } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import watch from '../images/watch.jpg'
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart } from '../features/user/userSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const userCartState = useSelector(state => state.auth?.cartProducts);
    useEffect(() => {
        dispatch(getUserCart())
    }, [])
    return (
        <>
            <Meta title={"Cart"} />
            <BreadCrumb title="Cart" />
            <Container class1="cart-wrapper home-wrapper-2 py-md-5">
                <div className="row">
                    <div className="col-12">
                        <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                            <h4 className='cart-col-1'>PRODUCT</h4>
                            <h4 className='cart-col-2'>PRICE</h4>
                            <h4 className='cart-col-3'>QUANTITY</h4>
                            <h4 className='cart-col-4'>TOTAL</h4>
                        </div>
                        {
                            userCartState && userCartState.map((item, index) => (
                                <div key={index} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                                        <div className="w-25">
                                            <img src={watch} className='img-fluid' alt="product" />
                                        </div>
                                        <div className="w-75">
                                            <p>{item?.productId.title}</p>
                                            <p className='d-flex align-items-center gap-3'>
                                                Color:
                                                <ul className='colors ps-0'>
                                                    <li style={{ backgroundColor: item?.color.title }}></li>
                                                </ul>
                                            </p>
                                            <p>Size: XXL</p>
                                        </div>
                                    </div>
                                    <div className="cart-col-2 d-flex align-items-center">
                                        <h5 className="price">$ {item?.price}</h5>
                                    </div>
                                    <div className="cart-col-3 d-flex align-items-center gap-15">
                                        <div className="">
                                            <input
                                                className='form-control'
                                                type="number"
                                                name=""
                                                id=""
                                                min={1}
                                                max={10}
                                                value={item?.quantity}
                                            />
                                        </div>
                                        <div className='reset-quantity-button'>
                                            <FaRegTrashCan className='reset-quantity-icon' />
                                        </div>
                                    </div>
                                    <div className="cart-col-4 d-flex align-items-center">
                                        <h5 className="price">$ {item?.price * item?.quantity}</h5>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-12 py-2 mt-4">
                        <div className="d-flex justify-content-between align-items-baseline">
                            <Link to='/product' className='button'>Continue Shopping</Link>
                            <div className="cart-checkout-info d-flex flex-column align-items-end">
                                <h4>Subtotal: $ 1000.00</h4>
                                <p>(Taxes and shipping calculated at checkout)</p>
                                <Link to='/checkout' className='button'>Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Cart