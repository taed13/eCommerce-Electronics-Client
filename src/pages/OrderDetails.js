import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import { useSelector, useDispatch } from "react-redux";
import { getAnOrder, resetCart } from "../features/user/userSlice";
import { Link, useLocation } from "react-router-dom";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";

const OrderSuccess = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    console.log(id);
    const dispatch = useDispatch();
    const orderState = useSelector((state) => state?.auth?.getAnOrder);

    console.log(123123, orderState);

    useEffect(() => {
        dispatch(getAnOrder(id));
    }, [dispatch, id])

    return (
        <>
            <Meta title={"Electronics | Chi tiết đơn hàng"} />
            <BreadCrumb title={"Chi tiết đơn hàng"} />
            <section className="vh-50 gradient-custom-2">
                <MDBContainer className="py-4 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol className="d-flex justify-content-center gap-1">
                            <MDBCard className="card-stepper w-75" style={{ borderRadius: "16px" }}>
                                <MDBCardHeader className="p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="text-muted mb-2">
                                                Mã đơn hàng:{" "}
                                                <span className="fw-bold text-body">
                                                    {orderState?.order_code}
                                                </span>
                                            </p>
                                            <p className="text-muted mb-0">
                                                Ngày đặt hàng:{" "}
                                                <span className="fw-bold text-body">
                                                    {new Date(orderState?.createdAt)?.toLocaleDateString()}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </MDBCardHeader>
                                <MDBCardBody className="p-3 d-flex flex-column justify-content-between">
                                    <div>
                                        {orderState?.order_items?.map((product, index) => (
                                            <div className="order-item d-flex align-items-center py-2" key={index}>
                                                <div>
                                                    <MDBCardImage
                                                        fluid
                                                        className="align-self-center"
                                                        src={product.productId.product_images[0].url}
                                                        width="100"
                                                    />
                                                </div>
                                                <div className="flex-fill ms-3">
                                                    <MDBTypography tag="h6" className="bold">
                                                        <Link to={`/product/${product.productId._id}`}>{product.productId.product_name}</Link>
                                                    </MDBTypography>
                                                    <div className="d-flex flex-column gap-1">
                                                        <div className="row">
                                                            <span className="col-4 text-muted">
                                                                <small>Hãng: {product.productId.product_brand[0].title}</small>
                                                            </span>
                                                            <span className="col-6 text-muted">
                                                                <small>Đơn giá: {product.price.toLocaleString()}₫</small>
                                                            </span>
                                                        </div>
                                                        <div className="row">
                                                            <span className="col-4 text-muted">
                                                                <small>Số lượng: {product.quantity}</small>
                                                            </span>
                                                            <span className="col-6 text-muted d-flex align-items-center gap-1">
                                                                <small>Màu: {product?.product_colors[0]?.name}</small>
                                                                <div className="color-container" style={{ background: product?.product_colors[0]?.code }}></div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                            <div className="d-flex flex-column gap-1 flex-grow-1 w-25">
                                <MDBCard className="card-stepper" style={{ borderRadius: "16px" }}>
                                    <MDBCardBody className="p-3">
                                        <div className="d-flex flex-column gap-1">
                                            <MDBTypography tag="h6" className="fw-normal mb-0">
                                                Địa chỉ nhận hàng
                                            </MDBTypography>
                                            <MDBTypography tag="span" className="text-muted fw-normal mb-0">
                                                {orderState?.order_userId?.name}
                                            </MDBTypography>
                                            <MDBTypography tag="span" className="text-muted fw-normal mb-0">
                                                {orderState?.order_userId?.email}
                                            </MDBTypography>
                                            <MDBTypography tag="span" className="text-muted fw-normal mb-0">
                                                {orderState?.order_shipping?.mobileNo}
                                            </MDBTypography>
                                            <MDBTypography tag="span" className="text-muted fw-normal mb-0">
                                                {orderState?.order_shipping?.street}, {orderState?.order_shipping?.ward.full_name},{" "}
                                                {orderState?.order_shipping?.district.full_name}, {orderState?.order_shipping?.province.name}
                                            </MDBTypography>
                                        </div>
                                        <hr />
                                        <div className="d-flex flex-column gap-1">
                                            <MDBTypography tag="h6" className="fw-normal mb-0">
                                                Thông tin thanh toán
                                            </MDBTypography>
                                            <MDBTypography tag="span" className="text-muted fw-normal mb-0">
                                                Phương thức thanh toán:{" "}
                                                {orderState?.paymentInfo.paymentMethod.toUpperCase()}
                                            </MDBTypography>
                                            <MDBTypography tag="span" className="text-muted fw-normal mb-0">
                                                Trạng thái thanh toán:{" "}
                                                {orderState?.paymentInfo.paymentStatus.charAt(0).toUpperCase() + orderState?.paymentInfo.paymentStatus.slice(1)}
                                            </MDBTypography>
                                            <MDBTypography tag="span" className="text-muted fw-bold mb-0">
                                                Tiền đã thanh toán:{" "}
                                                {((orderState?.checkoutInfo?.totalPriceAfterDiscount || 0) + (orderState?.checkoutInfo?.feeShip || 0)).toLocaleString("vi-VN")}₫
                                            </MDBTypography>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    );
};

export default OrderSuccess;