import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteCartProduct,
    getUserCart,
    updateCartProduct,
} from "../features/user/userSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const [productUpdateDetails, setProductUpdateDetails] = useState({});
    const [subTotal, setSubTotal] = useState(0);

    const userCartState = useSelector((state) => state.auth?.cartProducts);
    const userAuthState = useSelector((state) => state.auth?.cartProduct);
    const userDeletedCartState = useSelector((state) => state.auth?.deletedCartProduct);

    useEffect(() => {
        if (userAuthState) {
            dispatch(getUserCart());
        }
        dispatch(getUserCart());
    }, [dispatch, productUpdateDetails]);

    useEffect(() => {
        if (Object.keys(productUpdateDetails).length > 0) {
            const productDetails = Object.values(productUpdateDetails)[0];
            dispatch(updateCartProduct(productDetails));
            dispatch(getUserCart());

        }
    }, [productUpdateDetails, dispatch]);

    const handleQuantityChange = (cartItemId, quantity) => {
        setProductUpdateDetails({
            [cartItemId]: {
                cartItemId,
                quantity,
            },
        });
    };

    const deleteACartProduct = (id) => {
        dispatch(deleteCartProduct(id));
    };

    useEffect(() => {
        dispatch(getUserCart());
    }, [dispatch, userDeletedCartState]);

    useEffect(() => {
        let sum = 0;
        userCartState?.data?.cart_products?.forEach((item) => {
            sum += Number(item?.price) * Number(item?.quantity);
        });
        setSubTotal(sum);
    }, [userCartState]);

    console.log('subTotal', subTotal);
    console.log("userCartState", userCartState);

    return (
        <>
            <Meta title={"Giỏ hàng của tôi"} />
            <BreadCrumb title="Giỏ hàng của tôi" />
            <Container class1="cart-wrapper home-wrapper-2 py-md-5">
                <div className="row">
                    <div className="col-12">
                        <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                            <h4 className="cart-col-1">Sản phẩm</h4>
                            <h4 className="cart-col-2">Giá</h4>
                            <h4 className="cart-col-3">Số lượng</h4>
                            <h4 className="cart-col-4">Tổng</h4>
                        </div>
                        {
                            userCartState && userCartState?.data?.cart_products?.map((item, index) => (
                                <div key={index} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                                        <div className="w-25">
                                            <Link to={`/product/${item?.productId?._id}`}>
                                                <img
                                                    src={item?.productId?.product_images[0]?.url}
                                                    className="img-fluid"
                                                    alt="product"
                                                />
                                            </Link>
                                        </div>
                                        <div className="w-75">
                                            <Link to={`/product/${item?.productId?._id}`}>
                                                <p className="text-decoration-underline link-primary">{item?.productId?.product_name}</p>
                                            </Link>
                                            <div className="d-flex align-items-start gap-3">
                                                <p>Màu:</p>
                                                <ul className="colors ps-0">
                                                    <li
                                                        style={{ backgroundColor: item?.product_color[0]?.code }}
                                                    ></li>
                                                </ul>
                                            </div>
                                            <p>Size: XXL</p>
                                        </div>
                                    </div>
                                    <div className="cart-col-2 d-flex align-items-center">
                                        <h5 className="price">{item?.price}đ</h5>
                                    </div>
                                    <div className="cart-col-3 d-flex align-items-center gap-15">
                                        <div className="">
                                            <input
                                                className="form-control"
                                                type="number"
                                                name="quantity"
                                                id="quantity"
                                                min={1}
                                                max={10}
                                                value={
                                                    productUpdateDetails[item?._id]?.quantity ||
                                                    item?.quantity
                                                }
                                                onChange={(e) =>
                                                    handleQuantityChange(item?._id, e.target.value)
                                                }
                                            />
                                        </div>
                                        <div
                                            className="reset-quantity-button"
                                            onClick={() => {
                                                deleteACartProduct(item?._id);
                                            }}
                                        >
                                            <FaRegTrashCan className="reset-quantity-icon" />
                                        </div>
                                    </div>
                                    <div className="cart-col-4 d-flex align-items-center">
                                        <h5 className="price">{item?.price * item?.quantity}đ</h5>
                                    </div>
                                </div>
                            )
                            )}
                    </div>
                    <div className="col-12 py-2 mt-4">
                        <div className="d-flex justify-content-between align-items-baseline">
                            <Link to="/product" className="button">
                                Tiếp tục mua sắm
                            </Link>
                            {subTotal === null || subTotal === 0 ? (
                                <></>
                            ) : (
                                <div className="cart-checkout-info d-flex flex-column align-items-end">
                                    <h4>Tổng giá đơn hàng: $ {subTotal}</h4>
                                    <p>(Thuế và phí vận chuyển sẽ được tính ở phần thanh toán)</p>
                                    <Link to="/checkout" className="button">
                                        Thanh toán
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Cart;
