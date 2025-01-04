import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/user/userSlice";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

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
            <Meta title={"Electronics | Lịch sử đặt hàng"} />
            <BreadCrumb title="Lịch sử đặt hàng" />
            <Container class1="cart-wrapper home-wrapper-2 py-3">
                <div className="row">
                    <div className="col-12">
                        {orderState &&
                            orderState?.map((order, index) => (
                                <div className="order-history-item row my-5" key={index}>
                                    <div className="d-flex align-items-start justify-content-between">
                                        <div className="col-8 d-flex gap-2 mb-1">
                                            <p><strong>Mã đơn hàng:</strong></p>
                                            <p>{order?.order_code}</p>
                                        </div>
                                        <Link to={`/order/${order._id}`}>Chi tiết đơn hàng</Link>
                                    </div>
                                    <div className="col-12 d-flex gap-2 mb-1">
                                        <p><strong>Tổng giá đơn hàng:</strong></p>
                                        <p>{order?.checkoutInfo?.totalPrice.toLocaleString()}₫</p>
                                    </div>
                                    <div className="col-12 d-flex gap-2 mb-1">
                                        <p><strong>Tổng giá sau khi áp dụng discount:</strong></p>
                                        <p>{order?.checkoutInfo?.totalPriceAfterDiscount.toLocaleString()}₫</p>
                                    </div>
                                    <div className="col-12 d-flex gap-2 mb-1">
                                        <p><strong>Ngày đặt hàng:</strong></p>
                                        <p>{new Date(order?.createdAt).toLocaleDateString('vi-VN')}</p>
                                    </div>
                                    <div className="col-12 d-flex gap-2 mb-1">
                                        <p><strong>Trạng thái đơn hàng:</strong></p>
                                        <p>{order?.order_status}</p>
                                    </div>
                                    <div className="col-12">
                                        <div className="order-prod-item-list-header row p-3">
                                            <div className="col-3 mb-2">
                                                <span className="fw-bold">Tên sản phẩm</span>
                                            </div>
                                            <div className="col-3 mb-2">
                                                <span className="fw-bold">Số lượng</span>
                                            </div>
                                            <div className="col-3 mb-2">
                                                <span className="fw-bold">Đơn giá</span>
                                            </div>
                                            <div className="col-3 mb-2">
                                                <span className="fw-bold">Màu</span>
                                            </div>
                                            {order?.order_items?.map((item, index) => (
                                                <div className="order-prod-item col-12 pb-2" key={index}>
                                                    <div className="row pt-3">
                                                        <div className="col-3 d-flex align-items-center">
                                                            <span className="">
                                                                {item?.productId?.product_name}
                                                            </span>
                                                        </div>
                                                        <div className="col-3 d-flex align-items-center">
                                                            <span className="">{item?.quantity}</span>
                                                        </div>
                                                        <div className="col-3 d-flex align-items-center">
                                                            <span className="">{item.price.toLocaleString()}₫</span>
                                                        </div>
                                                        <div className="col-3 d-flex align-items-center">
                                                            <ul className="colors ps-0">
                                                                <li style={{ backgroundColor: item?.product_colors[0]?.code, border: "1px solid #ccc" }}
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
