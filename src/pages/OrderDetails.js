import React, { useEffect } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
    MDBBtn
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { getAnOrder, reorderCart } from "../features/user/userSlice";
import { Link, useLocation } from "react-router-dom";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { cancelOrderService } from "../api/order.api";
import "../styles/order.css";
import { toast } from "react-toastify";

const OrderSuccess = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const dispatch = useDispatch();
    const orderState = useSelector((state) => state?.auth?.getAnOrder);

    const isCancellable =
        orderState?.order_status?.toLowerCase() !== "cancelled" &&
        orderState?.order_status?.toLowerCase() !== "delivered";

    const isReorderable = ["shipped", "delivered", "cancelled"].includes(orderState?.order_status?.toLowerCase());

    useEffect(() => {
        dispatch(getAnOrder(id));
    }, [dispatch, id]);

    const handleCancelOrder = async () => {
        try {
            const response = await cancelOrderService(id);
            if (response.status === 200) {
                toast.success(response.data?.message || "Đơn hàng đã hủy thành công!");
                dispatch(getAnOrder(id));
            }
        } catch (error) {
            console.error("Lỗi API:", error);
            const message = error.response?.data?.message || "Có lỗi xảy ra khi hủy đơn hàng!";
            toast.error(message);
        }
    };

    const handleReorder = () => {
        dispatch(reorderCart(id))
            .unwrap()
            .then(() => {
                toast.success("Sản phẩm đã được thêm lại vào giỏ hàng!");
            })
            .catch((error) => {
                toast.error(error || "Có lỗi xảy ra khi mua lại đơn hàng!");
            });
    };

    return (
        <>
            <Meta title={"Electronics | Chi tiết đơn hàng"} />
            <BreadCrumb title={"Chi tiết đơn hàng"} />
            <section className="vh-50 gradient-custom-2">
                <MDBContainer className="py-4 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol className="d-flex justify-content-center gap-2">
                            <MDBCard className="order-card w-75 shadow-lg" style={{ borderRadius: "16px" }}>
                                <MDBCardHeader className="p-4 text-bg-primary bg-gradient">
                                    <div className="d-flex justify-content-between align-items-center text-black">
                                        <div>
                                            <p className="mb-2 fs-5 fw-bold">
                                                Mã đơn hàng:{" "}
                                                <span className="text-warning">{orderState?.order_code}</span>
                                            </p>
                                            <p className="mb-0">
                                                Ngày đặt hàng:{" "}
                                                <span className="text-black">
                                                    {new Date(orderState?.createdAt)?.toLocaleDateString()}
                                                </span>
                                            </p>
                                            <p className="mb-0">
                                                Trạng thái đơn hàng:{" "}
                                                <span className={`fw-bold ${orderState?.order_status === "Delivered" ? "text-success" : "text-warning"
                                                    }`}
                                                >
                                                    {orderState?.order_status}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </MDBCardHeader>
                                <MDBCardBody className="p-4 d-flex flex-column justify-content-between">
                                    <div>
                                        {orderState?.order_items?.map((product, index) => (
                                            <div className="order-item d-flex align-items-center py-3" key={index}>
                                                <div>
                                                    <MDBCardImage
                                                        fluid
                                                        className="align-self-center rounded"
                                                        src={product.productId.product_images[0].url}
                                                        width="120"
                                                        alt={product.productId.product_name}
                                                    />
                                                </div>
                                                <div className="flex-fill ms-4">
                                                    <MDBTypography tag="h6" className="fw-bold mb-1">
                                                        <Link to={`/product/${product.productId._id}`} className="text-dark">
                                                            {product.productId.product_name}
                                                        </Link>
                                                    </MDBTypography>
                                                    <div className="d-flex flex-column gap-2">
                                                        <div className="row">
                                                            <span className="col-4 text-muted">
                                                                Hãng: {product.productId.product_brand[0].title}
                                                            </span>
                                                            <span className="col-6">
                                                                Đơn giá:{" "}
                                                                <span className="fw-bold text-danger">
                                                                    {product.price.toLocaleString()}₫
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div className="row">
                                                            <span className="col-4">
                                                                Số lượng:{" "}
                                                                <span className="fw-bold">{product.quantity}</span>
                                                            </span>
                                                            <span className="col-6 d-flex align-items-center gap-2">
                                                                Màu: <span className="fw-bold">{product?.product_colors[0]?.name}</span>
                                                                <div
                                                                    className="color-box"
                                                                    style={{ background: product?.product_colors[0]?.code }}
                                                                ></div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </MDBCardBody>
                            </MDBCard>

                            <div className="d-flex flex-column gap-2 flex-grow-1 w-25">
                                <MDBCard className="shadow-sm" style={{ borderRadius: "16px" }}>
                                    <MDBCardBody className="p-3">
                                        <div className="d-flex flex-column gap-2">
                                            <MDBTypography tag="h5" className="fw-bold mb-2">
                                                Địa chỉ nhận hàng
                                            </MDBTypography>
                                            <p className="text-muted mb-0">
                                                {orderState?.order_userId?.name}
                                            </p>
                                            <p className="text-muted mb-0">
                                                {orderState?.order_userId?.email}
                                            </p>
                                            <p className="text-muted mb-0">
                                                {orderState?.order_shipping?.mobileNo}
                                            </p>
                                            <p className="text-muted mb-0">
                                                {orderState?.order_shipping?.street}, {orderState?.order_shipping?.ward.full_name},{" "}
                                                {orderState?.order_shipping?.district.full_name},{" "}
                                                {orderState?.order_shipping?.province.name}
                                            </p>
                                        </div>
                                        <hr />
                                        <div className="d-flex flex-column gap-2">
                                            <MDBTypography tag="h5" className="fw-bold mb-2">
                                                Thông tin thanh toán
                                            </MDBTypography>
                                            <p className="text-muted mb-0">
                                                Phương thức:{" "}
                                                <span className="fw-bold">{orderState?.paymentInfo.paymentMethod.toUpperCase()}</span>
                                            </p>
                                            <p className="text-muted mb-0">
                                                Trạng thái thanh toán:{" "}
                                                <span className="fw-bold">
                                                    {orderState?.paymentInfo.paymentStatus.charAt(0).toUpperCase() +
                                                        orderState?.paymentInfo.paymentStatus.slice(1)}
                                                </span>
                                            </p>
                                            <p className="text-danger fw-bold mb-0 fs-5">
                                                Tổng tiền:{" "}
                                                {(
                                                    (orderState?.checkoutInfo?.totalPriceAfterDiscount || 0) +
                                                    (orderState?.checkoutInfo?.feeShip || 0)
                                                ).toLocaleString("vi-VN")}
                                                ₫
                                            </p>
                                        </div>
                                    </MDBCardBody>
                                    <MDBCardFooter className="text-center">
                                        {isCancellable ? (
                                            <MDBBtn
                                                color="danger"
                                                size="md"
                                                className="fw-bold rounded-pill shadow-lg cancel-button"
                                                style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}
                                                onClick={handleCancelOrder}
                                            >
                                                Hủy đơn hàng
                                            </MDBBtn>
                                        ) : (
                                            <p className="text-danger fw-bold fs-6 mt-3">
                                                {orderState?.order_status === "Delivered"
                                                    ? "Đơn hàng đã được giao không thể hủy"
                                                    : "Đơn hàng đã bị hủy"}
                                            </p>
                                        )}
                                        {isReorderable && (
                                            <MDBBtn
                                                color="primary"
                                                size="md"
                                                className="fw-bold rounded-pill shadow-lg reorder-button mt-3"
                                                style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}
                                                onClick={handleReorder}
                                            >
                                                Mua lại đơn hàng
                                            </MDBBtn>
                                        )}
                                    </MDBCardFooter>
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
