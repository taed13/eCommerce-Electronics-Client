import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import { createOrderAndCheckOrderBefore } from "../features/user/userSlice";
import $ from "jquery";

const shippingSchema = yup.object({
    order_shipping: yup.object({
        lastName: yup.string().required("Họ là bắt buộc"),
        firstName: yup.string().required("Tên là bắt buộc"),
        mobileNo: yup.string().required("Số điện thoại là bắt buộc"),
        province: yup.object().shape({
            id: yup.string().required("Tỉnh/Thành phố là bắt buộc"),
            name: yup.string().required("Tỉnh/Thành phố là bắt buộc"),
        }),
        district: yup.object().shape({
            id: yup.string().required("Quận/Huyện là bắt buộc"),
            full_name: yup.string().required("Quận/Huyện là bắt buộc"),
        }),
        ward: yup.object().shape({
            id: yup.string().required("Phường/Xã là bắt buộc"),
            full_name: yup.string().required("Phường/Xã là bắt buộc"),
        }),
        street: yup.string().required("Số nhà, tên đường là bắt buộc"),
    }),
});

const Checkout = () => {
    const dispatch = useDispatch();
    const userCartState = useSelector((state) => state.auth?.cartProducts);
    const userState = useSelector((state) => state.auth);
    const cart_userId = userCartState?.data?.cart_userId;
    const [order, setOrder] = useState(null);
    const [subTotal, setSubTotal] = useState(0);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [couponCode, setCouponCode] = useState("");
    const [couponMessage, setCouponMessage] = useState("");
    const [couponMessageType, setCouponMessageType] = useState("");

    const [selectedProvince, setSelectedProvince] = useState({ id: null, name: '' });
    const [selectedDistrict, setSelectedDistrict] = useState({ id: null, name: '' });
    const [selectedWard, setSelectedWard] = useState({ id: null, name: '' });

    console.log("CART STATE:::");
    console.log(userCartState);

    useEffect(() => {
        const calculateSubTotal = () => {
            const total = userCartState?.data?.cart_products?.reduce((sum, item) => {
                return sum + Number(item?.price) * Number(item?.quantity);
            }, 0);
            setSubTotal(total || 0);
        };
        calculateSubTotal();
    }, [userCartState]);

    const formik = useFormik({
        initialValues: {
            order_shipping: {
                firstName: "",
                lastName: "",
                mobileNo: "",
                province: { id: "", name: "" },
                district: { id: "", full_name: "" },
                ward: { id: "", full_name: "" },
                street: "",
            },
        },
        validationSchema: shippingSchema,
        onSubmit: (values) => handleSubmit(values),
    });

    const formattedCartProducts = userCartState?.data?.cart_products?.map(item => ({
        productId: item.productId._id,
        product_colors: item.product_color.map(color => {
            return {
                code: color.code,
                name: color.name
            }
        }),
        quantity: item.quantity,
        name: item.name,
        price: item.price,
        _id: item._id
    })) || [];

    const prepareOrderData = {
        order_shipping: {
            firstName: formik.values.order_shipping.firstName,
            lastName: formik.values.order_shipping.lastName,
            mobileNo: formik.values.order_shipping.mobileNo,
            province: formik.values.order_shipping.province.name,
            district: formik.values.order_shipping.district.full_name,
            ward: formik.values.order_shipping.ward.full_name,
            street: formik.values.order_shipping.street,
        },
        order_items: formattedCartProducts,
        paymentInfo: {
            paymentMethod: "Credit Card",
            paymentStatus: "Pending",
        },
        checkoutInfo: {
            totalPrice: subTotal,
            totalPriceAfterDiscount: subTotal - 50000,
            feeShip: 34,
            discountApplied: "63f6c8f59d1e6c72b0dbe2f5",
        },
        estimatedDeliveryDate: new Date(),
    }

    const handleSubmit = (values) => {
        dispatch(createOrderAndCheckOrderBefore(prepareOrderData));
    };

    useEffect(() => {
        if (userState?.createdOrder?.order) {
            setOrder(userState.createdOrder.order);
        }
    }, [userState?.createdOrder?.order]);

    useEffect(() => {
        if (order) {
            checkOutHandler();
        }
    }, [order]);

    const checkOutHandler = async () => {
        if (!order || !order._id) {
            alert("Order is not ready yet. Please wait.");
            return;
        }
        try {
            const response = await axios.post(
                "http://127.0.0.1:5001/api/user/order/purchase",
                {
                    items: userCartState,
                    shippingInfo: formik.values.order_shipping,
                    orderId: order._id,
                },
                config
            );

            if (response.data.url) {
                window.location = response.data.url;
            }
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại.");
        }
    };

    useEffect(() => {
        $.getJSON("https://esgoo.net/api-tinhthanh/1/0.htm", (response) => {
            if (response.error === 0) {
                setProvinces(response.data);
            } else {
                console.error("Error fetching provinces:", response.message);
            }
        });
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            $.getJSON(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`, (response) => {
                if (response.error === 0) {
                    setDistricts(response.data);
                    setWards([]); // Reset wards
                } else {
                    console.error("Error fetching districts:", response.message);
                }
            });
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            $.getJSON(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`, (response) => {
                if (response.error === 0) {
                    setWards(response.data);
                } else {
                    console.error("Error fetching wards:", response.message);
                }
            });
        }
    }, [selectedDistrict]);

    useEffect(() => {
        if (userState?.user?.addresses?.[0]) {
            const address = userState.user.addresses[0];

            const defaultProvince = provinces.find(province => province.name === address.province);
            const defaultDistrict = districts.find(district => district.full_name === address.district);
            const defaultWard = wards.find(ward => ward.full_name === address.ward);

            // Đặt giá trị mặc định cho Formik
            if (defaultProvince) {
                formik.setFieldValue("order_shipping.province", {
                    id: defaultProvince.id,
                    name: defaultProvince.name,
                });
                setSelectedProvince(defaultProvince.id);
            }

            if (defaultDistrict) {
                formik.setFieldValue("order_shipping.district", {
                    id: defaultDistrict.id,
                    full_name: defaultDistrict.full_name,
                });
                setSelectedDistrict(defaultDistrict.id);
            }

            if (defaultWard) {
                formik.setFieldValue("order_shipping.ward", {
                    id: defaultWard.id,
                    full_name: defaultWard.full_name,
                });
                setSelectedWard(defaultWard.id);
            }

            // Đặt giá trị cho các trường khác
            formik.setFieldValue("order_shipping.street", address.street || "");
            formik.setFieldValue("order_shipping.mobileNo", address.mobileNo || "");
            formik.setFieldValue("order_shipping.firstName", address.firstName || "");
            formik.setFieldValue("order_shipping.lastName", address.lastName || "");
        }
    }, [userState, provinces, districts, wards]);

    const handleApplyCoupon = async () => {
        try {
            if (!couponCode) {
                setCouponMessage("Vui lòng nhập mã giảm giá!");
                setCouponMessageType("danger");
                return;
            }

            // Thay thế bằng API của bạn
            const response = await fetch("/api/discount/apply", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ couponCode }),
            });

            const data = await response.json();

            if (data.success) {
                setCouponMessage("Áp dụng mã giảm giá thành công!");
                setCouponMessageType("success");
            } else {
                setCouponMessage(data.message || "Mã giảm giá không hợp lệ.");
                setCouponMessageType("danger");
            }
        } catch (error) {
            setCouponMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
            setCouponMessageType("danger");
        }
    };
    return (
        <Container class1="checkout-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-7">
                    <div className="checkout-left-data">
                        <h3 className="website-name">Electronics</h3>
                        <nav
                            style={{ "--bs-breadcrumb-divider": ">" }}
                            aria-label="breadcrumb"
                        >
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link className="text-dark" to="/cart">
                                        Giỏ hàng
                                    </Link>
                                </li>
                                &nbsp; /
                                <li className="breadcrumb-item partial-price active">
                                    Thông tin
                                </li>
                                &nbsp; /
                                <li className="breadcrumb-item partial-price active">
                                    Giao hàng
                                </li>
                                &nbsp; /
                                <li
                                    className="breadcrumb-item partial-price active"
                                    aria-current="page"
                                >
                                    Thanh toán
                                </li>
                            </ol>
                        </nav>
                        <h4 className="title total">Thông tin liên hệ</h4>
                        <p className="user-details">{cart_userId?.name} - {cart_userId?.email}</p>
                        <div className="border rounded p-4 mb-2">
                            <h4 className="mb-3">Địa chỉ giao hàng</h4>
                            <form
                                onSubmit={formik.handleSubmit}
                                className="d-flex gap-15 flex-wrap justify-content-between"
                            >
                                <div className="flex-grow-1">
                                    <input
                                        type="text"
                                        placeholder="Họ"
                                        className="form-control"
                                        name="order_shipping.lastName"
                                        value={formik.values.order_shipping.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className="error fail-message mt-1">
                                        {formik.touched.order_shipping?.lastName &&
                                            formik.errors.order_shipping?.lastName}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        type="text"
                                        placeholder="Tên"
                                        className="form-control"
                                        name="order_shipping.firstName"
                                        value={formik.values.order_shipping.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className="error fail-message mt-1">
                                        {formik.touched.order_shipping?.firstName &&
                                            formik.errors.order_shipping?.firstName}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input
                                        type="text"
                                        placeholder="Số Điện Thoại"
                                        className="form-control"
                                        name="order_shipping.mobileNo"
                                        value={formik.values.order_shipping.mobileNo}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className="error fail-message mt-1">
                                        {formik.touched.order_shipping?.mobileNo &&
                                            formik.errors.order_shipping?.mobileNo}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <select
                                        name="order_shipping.province"
                                        className="form-control form-select"
                                        value={formik.values.order_shipping.province.id}
                                        onChange={(e) => {
                                            const selectedProvince = provinces.find(
                                                (province) => province.id === e.target.value
                                            );
                                            formik.setFieldValue("order_shipping.province", {
                                                id: selectedProvince.id,
                                                name: selectedProvince.name,
                                            });
                                            setSelectedProvince(selectedProvince.id);
                                        }}
                                        onBlur={formik.handleBlur}
                                    >
                                        <option value="" disabled>
                                            Chọn Tỉnh/Thành
                                        </option>
                                        {provinces.map((province) => (
                                            <option key={province.id} value={province.id}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="error fail-message mt-1">
                                        {formik.touched.order_shipping?.province &&
                                            formik.errors.order_shipping?.province}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <select
                                        name="order_shipping.district"
                                        className="form-control form-select"
                                        value={formik.values.order_shipping.district.id}
                                        onChange={(e) => {
                                            const selectedDistrict = districts.find(
                                                (district) => district.id === e.target.value
                                            );
                                            formik.setFieldValue("order_shipping.district", {
                                                id: selectedDistrict.id,
                                                full_name: selectedDistrict.full_name,
                                            });
                                            setSelectedDistrict(selectedDistrict.id);
                                        }}
                                        onBlur={formik.handleBlur}
                                        disabled={!selectedProvince.length}
                                    >
                                        <option value="" disabled>
                                            Chọn Quận/Huyện
                                        </option>
                                        {districts.map((district) => (
                                            <option key={district.id} value={district.id}>
                                                {district.full_name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="error fail-message mt-1">
                                        {formik.touched.order_shipping?.district &&
                                            formik.errors.order_shipping?.district}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <select
                                        name="order_shipping.ward"
                                        className="form-control form-select"
                                        value={formik.values.order_shipping.ward.id}
                                        onChange={(e) => {
                                            const selectedWard = wards.find(
                                                (ward) => ward.id === e.target.value
                                            );
                                            formik.setFieldValue("order_shipping.ward", {
                                                id: selectedWard.id,
                                                full_name: selectedWard.full_name,
                                            });
                                            setSelectedWard(selectedWard.id);
                                        }
                                        }
                                        onBlur={formik.handleBlur}
                                        disabled={!selectedDistrict.length}
                                    >
                                        <option value="" disabled>
                                            Chọn Phường/Xã
                                        </option>
                                        {wards.map((ward) => (
                                            <option key={ward.id} value={ward.id}>
                                                {ward.full_name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="error fail-message mt-1">
                                        {formik.touched.order_shipping?.ward &&
                                            formik.errors.order_shipping?.ward}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input
                                        type="text"
                                        placeholder="Số nhà, tên đường"
                                        className="form-control"
                                        name="order_shipping.street"
                                        value={formik.values.order_shipping.street}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className="error fail-message mt-1">
                                        {formik.touched.order_shipping?.street &&
                                            formik.errors.order_shipping?.street}
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="border rounded p-4 mb-2">
                            <h4 className="mb-3">Nhập mã giảm giá</h4>
                            <form className="d-flex flex-column gap-3">
                                <div className="mb-3">
                                    <label htmlFor="couponCode" className="form-label fw-bold">
                                        Mã giảm giá
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="couponCode"
                                            placeholder="Nhập mã giảm giá"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="button"
                                            onClick={handleApplyCoupon}
                                        >
                                            Áp dụng
                                        </button>
                                    </div>
                                </div>
                                {couponMessage && (
                                    <p className={`text-${couponMessageType === 'success' ? 'success' : 'danger'} fw-semibold`}>
                                        {couponMessage}
                                    </p>
                                )}
                            </form>
                        </div>

                        <div className="w-100">
                            <div className="d-flex justify-content-between align-items-center">
                                <Link
                                    to="/cart"
                                    className="text-dark d-flex align-items-center hover-underline"
                                >
                                    <IoIosArrowBack className="fs-5 me-1" />
                                    Quay lại giỏ hàng
                                </Link>
                                <button className="button" type="submit">
                                    Đặt hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-5">
                    <div className="border-bottom py-4 d-flex flex-column gap-30">
                        {
                            userCartState && userCartState?.data?.cart_products?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="d-flex justify-content-between gap-10 align-items-center"
                                    >
                                        <div className="w-75 d-flex gap-15">
                                            <div className="w-25 position-relative">
                                                <span className="checkout-product-number-badge badge">
                                                    {item?.quantity}
                                                </span>
                                                <img
                                                    src={item?.productId?.product_images[0]?.url}
                                                    className="img-fluid"
                                                    alt="product"
                                                />
                                            </div>
                                            <div className="d-flex flex-column justify-content-center">
                                                <h5 className="total">{item?.productId?.product_name}</h5>
                                                {/* TODO: dụt th =))) cái này th cũ ghi vô chơ có quản lí đ mô */}
                                                <p className="partial mb-0">
                                                    {item?.product_color[0]?.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-25 flex-grow-1 d-flex align-items-center justify-content-end">
                                            <h5 className="partial-price mb-0">{(item?.price).toLocaleString()}₫</h5>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <div className="border-bottom py-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="partial">Tổng cộng</p>
                            <p className="partial-price">
                                {userCartState?.data?.cart_products?.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}₫
                            </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-0 partial">Phí vận chuyển</p>
                            <p className="mb-0 partial-price">340,000₫</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                        <h4 className="total">Tổng cộng (bao gồm phí vận chuyển)</h4>
                        <h5 className="total-price">
                            {(userCartState?.data?.cart_products?.reduce(
                                (acc, item) => acc + item.price * item.quantity,
                                0
                            ) + 340000).toLocaleString()}₫
                        </h5>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Checkout;
