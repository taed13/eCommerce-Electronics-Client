import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import watch from '../images/watch.jpg'
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartProduct, getUserCart, updateCartProduct } from '../features/user/userSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const [productUpdateDetails, setProductUpdateDetails] = useState(null);
    const [total, setTotal] = useState(null);

    const userCartState = useSelector(state => state.auth?.cartProducts);

    useEffect(() => {
        dispatch(getUserCart())
    }, [userCartState])

    useEffect(() => {
        if (productUpdateDetails) {
            dispatch(updateCartProduct(productUpdateDetails));
            setTimeout(() => {
                dispatch(getUserCart())
            }, 200)
        }
    }, [productUpdateDetails])

    const deleteACartProduct = (id) => {
        dispatch(deleteCartProduct(id));
        setTimeout(() => {
            dispatch(getUserCart())
        }, 200)
    }

    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < userCartState?.length; index++) {
            sum = sum + (Number(userCartState[index]?.price) * Number(userCartState[index]?.quantity));
            setTotal(sum);
        }
    }, [userCartState])

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
                                            <p>{item?.productId?.title}</p>
                                            <div className='d-flex align-items-start gap-3'>
                                                <p>Color:</p>
                                                <ul className='colors ps-0'>
                                                    <li style={{ backgroundColor: item?.color?.title }}></li>
                                                </ul>
                                            </div>
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
                                                value={productUpdateDetails?.quantity ? productUpdateDetails?.quantity : item?.quantity}
                                                onChange={(e) => { setProductUpdateDetails({ cartItemId: item?._id, quantity: e.target.value }) }}
                                            />
                                        </div>
                                        <div className='reset-quantity-button' onClick={() => { deleteACartProduct(item?._id) }}>
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
                            <Link to='/product' className='button'>Continue shopping</Link>
                            {
                                (total === null || total === 0) ? <></> :
                                <div className="cart-checkout-info d-flex flex-column align-items-end">
                                    <h4>Subtotal: $ {total}</h4>
                                    <p>(Taxes and shipping calculated at checkout)</p>
                                    <Link to='/checkout' className='button'>Checkout</Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Cart