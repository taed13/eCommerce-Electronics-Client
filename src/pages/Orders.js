import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/user/userSlice";
import Meta from "../components/Meta";

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
            <Meta title={"Electronics | Đơn hàng của tôi"} />
            <BreadCrumb title="Đơn hàng của tôi" />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-3">
                                <h5>Mã đơn hàng</h5>
                            </div>
                            <div className="col-3">
                                <h5>Tổng tiền</h5>
                            </div>
                            <div className="col-3">
                                <h5>Tổng tiền sau khi giảm giá</h5>
                            </div>
                            <div className="col-3">
                                <h5>Trạng thái</h5>
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
                                        <p>{order?.order_code}</p>
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
                                                <h6 className="text-white">Tên sản phẩm</h6>
                                            </div>
                                            <div className="col-3">
                                                <h6 className="text-white">Số lượng</h6>
                                            </div>
                                            <div className="col-3">
                                                <h6 className="text-white">Giá</h6>
                                            </div>
                                            <div className="col-3">
                                                <h6 className="text-white">Màu</h6>
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
                                                                        backgroundColor: item?.product_colors[0]?.code,
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
