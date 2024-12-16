import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/user/userSlice";

const Orders = () => {
    const dispatch = useDispatch();
    const orderState = useSelector(
        (state) => state?.auth?.getOrderedProduct
    );

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    console.log(orderState);

    return (
        <>
            <BreadCrumb title="My Orders" />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-3">
                                <h5>Order Id</h5>
                            </div>
                            <div className="col-3">
                                <h5>Total Amount</h5>
                            </div>
                            <div className="col-3">
                                <h5>Total Amount After Discount</h5>
                            </div>
                            <div className="col-3">
                                <h5>Status</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        {orderState &&
                            orderState?.map((order, index) => (
                                <div
                                    style={{ backgroundColor: "#febd69" }}
                                    className="row pt-3 my-3"
                                    key={index}
                                >
                                    <div className="col-3">
                                        <p>{order?._id}</p>
                                    </div>
                                    <div className="col-3">
                                        <p>{order?.checkoutInfo?.totalPrice}</p>
                                    </div>
                                    <div className="col-3">
                                        <p>{order?.checkoutInfo?.totalPriceAfterDiscount}</p>
                                    </div>
                                    <div className="col-3">
                                        <p>{order?.order_status}</p>
                                    </div>
                                    <div className="col-12">
                                        <div
                                            className="row py-3"
                                            style={{ backgroundColor: "#232f3e" }}
                                        >
                                            <div className="col-3">
                                                <h6 className="text-white">Product Name</h6>
                                            </div>
                                            <div className="col-3">
                                                <h6 className="text-white">Quantity</h6>
                                            </div>
                                            <div className="col-3">
                                                <h6 className="text-white">Price</h6>
                                            </div>
                                            <div className="col-3">
                                                <h6 className="text-white">Color</h6>
                                            </div>
                                            {order?.order_items?.map((item, index) => (
                                                <div className="col-12" key={index}>
                                                    <div className="row bg-secondary p-3">
                                                        <div className="col-3">
                                                            <p className="text-white">
                                                                {item?.productId?.product_name}
                                                            </p>
                                                        </div>
                                                        <div className="col-3">
                                                            <p className="text-white">{item?.quantity}</p>
                                                        </div>
                                                        <div className="col-3">
                                                            <p className="text-white">{item.price}</p>
                                                        </div>
                                                        <div className="col-3">
                                                            <ul className="colors ps-0">
                                                                <li
                                                                    style={{
                                                                        backgroundColor: item?.color?.title,
                                                                    }}
                                                                ></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Orders;
