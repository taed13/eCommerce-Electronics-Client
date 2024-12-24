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
import "./style.css";
import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { resetCart } from "../../features/user/userSlice";

const OrderSuccess = () => {
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSessionDetails = async () => {
            const params = new URLSearchParams(window.location.search);
            const sessionId = params.get("session_id");

            if (!sessionId) {
                setError("Missing session ID");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.post(
                    `http://127.0.0.1:5001/api/order/stripe-webhook/${sessionId}`,
                    {},
                    config
                );
                setOrderData(response.data);
            } catch (err) {
                setError("Failed to fetch order details");
            } finally {
                setLoading(false);
            }
        };

        fetchSessionDetails();
    }, []);

    useEffect(() => {
        if (orderData?.session?.payment_status === "paid") {
            toast.success("Payment successful");
            resetCart();
        }
    }, [orderData]);

    if (loading) return <p className="text-center py-5">Loading...</p>;
    if (error) return <p className="text-center text-danger py-5">{error}</p>;

    return (
        <section className="vh-50 gradient-custom-2">
            <MDBContainer className="py-4 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol className="d-flex justify-content-center gap-1">
                        <div className="d-flex flex-column gap-1 flex-grow-1 w-50">
                            <MDBCard
                                className="card-stepper"
                                style={{ borderRadius: "16px" }}
                            >
                                <MDBCardBody className="p-3">
                                    <MDBTypography tag="h5" className="fw-normal mb-1">
                                        Cảm ơn bạn đã mua hàng!
                                    </MDBTypography>
                                    <MDBTypography tag="h6" className="text-muted fw-normal mb-0">
                                        Bạn cũng nhận email chi tiết về đơn hàng này và chúng tôi sẽ
                                        thông báo cho bạn khi hàng đã được giao.
                                    </MDBTypography>
                                    <hr />
                                    <div className="d-flex flex-column gap-1">
                                        <MDBTypography tag="h5" className="fw-normal mb-0">
                                            Địa chỉ nhận hàng
                                        </MDBTypography>
                                        <MDBTypography
                                            tag="h6"
                                            className="text-muted fw-normal mb-0"
                                        >
                                            {orderData.session.customer_details.name}
                                        </MDBTypography>
                                        <MDBTypography
                                            tag="h6"
                                            className="text-muted fw-normal mb-0"
                                        >
                                            {orderData.session.customer_details.email}
                                        </MDBTypography>
                                        {orderData.session.metadata &&
                                            orderData.session.metadata.shippingInfo &&
                                            (() => {
                                                const shippingInfo = JSON.parse(
                                                    orderData.session.metadata.shippingInfo
                                                );
                                                return (
                                                    <>
                                                        <MDBTypography
                                                            tag="h6"
                                                            className="text-muted fw-normal mb-0"
                                                        >
                                                            {shippingInfo.mobileNo}
                                                        </MDBTypography>
                                                        <MDBTypography
                                                            tag="h6"
                                                            className="text-muted fw-normal mb-0"
                                                        >
                                                            {shippingInfo.street}, {shippingInfo.ward},{" "}
                                                            {shippingInfo.district}, {shippingInfo.province}
                                                        </MDBTypography>
                                                    </>
                                                );
                                            })()}
                                    </div>
                                    <hr />
                                    <div className="d-flex flex-column gap-1">
                                        <MDBTypography tag="h5" className="fw-normal mb-0">
                                            Thông tin thanh toán
                                        </MDBTypography>
                                        <MDBTypography
                                            tag="h6"
                                            className="text-muted fw-normal mb-0"
                                        >
                                            Phương thức thanh toán{" "}
                                            {orderData.session.payment_method_types[0].toUpperCase()}
                                        </MDBTypography>
                                        <MDBTypography
                                            tag="h6"
                                            className="text-muted fw-normal mb-0"
                                        >
                                            Trạng thái thanh toán{" "}
                                            {orderData.session.payment_status
                                                .charAt(0)
                                                .toUpperCase() +
                                                orderData.session.payment_status.slice(1)}
                                        </MDBTypography>
                                        <MDBTypography
                                            tag="h6"
                                            className="text-muted fw-normal mb-0"
                                        >
                                            Tiền đã thanh toán{" "}
                                            {(orderData.session.amount_total / 100).toLocaleString()}{" "}
                                            {orderData.session.currency.toUpperCase()}
                                        </MDBTypography>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </div>

                        <MDBCard
                            className="card-stepper w-75"
                            style={{ borderRadius: "16px" }}
                        >
                            <MDBCardHeader className="p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="text-muted mb-2">
                                            Mã đơn hàng{" "}
                                            <span className="fw-bold text-body">
                                                {orderData.order.order_code}
                                            </span>
                                        </p>
                                        <p className="text-muted mb-0">
                                            Ngày đặt hàng{" "}
                                            <span className="fw-bold text-body">
                                                {new Date(
                                                    orderData.session.created * 1000
                                                ).toLocaleDateString()}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <MDBTypography tag="h6" className="mb-0">
                                            {" "}
                                            <a href="/my-orders">Chi tiết đơn hàng</a>
                                        </MDBTypography>
                                    </div>
                                </div>
                            </MDBCardHeader>
                            <MDBCardBody className="p-3">
                                {orderData.products.map((product, index) => (
                                    <div className="d-flex flex-row mb-2" key={index}>
                                        <div>
                                            <MDBCardImage
                                                fluid
                                                className="align-self-center"
                                                src={product.image}
                                                width="100"
                                            />
                                        </div>
                                        <div className="flex-fill ms-3">
                                            <MDBTypography tag="h5" className="bold">
                                                {product.name}
                                            </MDBTypography>
                                            <p className="text-muted">Qty: {product.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                                <ul
                                    id="progressbar-1"
                                    className="mx-0 mt-0 mb-5 px-0 pt-0 pb-4"
                                >
                                    <li className="step0 active" id="step1">
                                        <span style={{ marginLeft: "22px", marginTop: "12px" }}>
                                            PLACED
                                        </span>
                                    </li>
                                    <li className="step0 active text-center" id="step2">
                                        <span>SHIPPED</span>
                                    </li>
                                    <li className="step0 text-muted text-end" id="step3">
                                        <span style={{ marginRight: "22px" }}>DELIVERED</span>
                                    </li>
                                </ul>
                            </MDBCardBody>
                            {/* <MDBCardFooter className="p-2">
                                <div className="d-flex justify-content-between">
                                    <MDBTypography tag="h5" className="fw-normal mb-0">
                                        <a href="#!">Track</a>
                                    </MDBTypography>
                                    <div className="border-start h-100"></div>
                                    <MDBTypography tag="h5" className="fw-normal mb-0">
                                        <a href="#!">Cancel</a>
                                    </MDBTypography>
                                    <div className="border-start h-100"></div>
                                    <MDBTypography tag="h5" className="fw-normal mb-0">
                                        <a href="#!">Pre-pay</a>
                                    </MDBTypography>
                                    <div className="border-start h-100"></div>
                                    <MDBTypography tag="h5" className="fw-normal mb-0">
                                        <a href="#!" className="text-muted">
                                            <MDBIcon fas icon="ellipsis-v" />
                                        </a>
                                    </MDBTypography>
                                </div>
                            </MDBCardFooter> */}
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
};

export default OrderSuccess;
