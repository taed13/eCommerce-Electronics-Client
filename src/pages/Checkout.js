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
import { applyDiscount } from "../features/discount/discountSlice";
import $ from "jquery";
import { FaEdit, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const shippingSchema = yup.object({
    order_shipping: yup.object({
        lastname: yup.string().required("Họ là bắt buộc"),
        firstname: yup.string().required("Tên là bắt buộc"),
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
    const userInfoState = useSelector((state) => state.auth?.userInfo);
    const cart_userId = userCartState?.data?.cart_userId;
    const appliedDiscount = useSelector(
        (state) => state.discount?.appliedDiscount
    );
    const [order, setOrder] = useState(null);
    const [subTotal, setSubTotal] = useState(0);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [discountCode, setDiscountCode] = useState("");
    const [couponMessage, setCouponMessage] = useState("");
    const [couponMessageType, setCouponMessageType] = useState("");
    const [initialValues, setInitialValues] = useState({
        order_shipping: {
            firstname: "",
            lastname: "",
            mobileNo: "",
            province: { id: "", name: "" },
            district: { id: "", full_name: "" },
            ward: { id: "", full_name: "" },
            street: "",
        },
    });

    const [selectedProvince, setSelectedProvince] = useState({
        id: null,
        name: "",
    });
    const [selectedDistrict, setSelectedDistrict] = useState({
        id: null,
        full_name: "",
    });
    const [selectedWard, setSelectedWard] = useState({ id: null, full_name: "" });
    const [isEditable, setIsEditable] = useState(false);

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
        initialValues: initialValues,
        validationSchema: shippingSchema,
        enableReinitialize: true,
        onSubmit: (values) => handleSubmit(values),
    });

    const formattedCartProducts =
        userCartState?.data?.cart_products?.map((item) => ({
            productId: item.productId._id,
            product_colors: item.product_color.map((color) => {
                return {
                    code: color.code,
                    name: color.name,
                };
            }),
            quantity: item.quantity,
            name: item.name,
            price: item.price,
            _id: item._id,
        })) || [];

    const prepareOrderData = {
        discountCode: discountCode.trim() ? discountCode : null,
        cartTotal: subTotal,
        order_shipping: {
            firstname: formik.values.order_shipping.firstname,
            lastname: formik.values.order_shipping.lastname,
            mobileNo: formik.values.order_shipping.mobileNo,
            province: formik.values.order_shipping.province,
            district: formik.values.order_shipping.district,
            ward: formik.values.order_shipping.ward,
            street: formik.values.order_shipping.street,
        },
        order_items: formattedCartProducts,
        paymentInfo: {
            paymentMethod: "Credit Card",
            paymentStatus: "Pending",
        },
        checkoutInfo: {
            totalPrice: subTotal,
            totalPriceAfterDiscount: appliedDiscount
                ? subTotal - appliedDiscount.discountAmount
                : subTotal,
            feeShip: 340000,
            discountApplied: appliedDiscount?.discount_id || null,
        },
        estimatedDeliveryDate: new Date(),
        order_status: "Ordered",
        trackingNumber: "TRK123456",
    };

    const handleSubmit = (values) => {
        dispatch(createOrderAndCheckOrderBefore(prepareOrderData));
    };

    useEffect(() => {
        if (userState?.createdOrder?.order) {
            setOrder(userState.createdOrder.order);
        }
    }, [userState?.createdOrder?.order]);

    useEffect(() => {
        console.log('userinfor:::', userState?.userInfo);
    }, [userState?.userInfo]);

    useEffect(() => {
        if (order) {
            checkOutHandler();
        }
    }, [order]);

    useEffect(() => {
        if (initialValues) {
            formik.setValues(initialValues); // Cập nhật giá trị khi initialValues thay đổi
        }
    }, [initialValues]);


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
        if (selectedProvince?.id) {
            $.getJSON(
                `https://esgoo.net/api-tinhthanh/2/${selectedProvince.id}.htm`,
                (response) => {
                    if (response.error === 0) {
                        setDistricts(response.data);
                        // Nếu đã có district trong `initialValues`, thiết lập lại
                        const defaultDistrict = response.data.find(
                            (district) => district.full_name === initialValues.order_shipping.district.full_name
                        );
                        if (defaultDistrict) {
                            setSelectedDistrict({
                                id: defaultDistrict.id,
                                full_name: defaultDistrict.full_name,
                            });
                        }
                    } else {
                        console.error("Error fetching districts:", response.message);
                    }
                }
            );
        }
    }, [selectedProvince, initialValues]);

    useEffect(() => {
        if (districts.length && initialValues.order_shipping.district.id) {
            const defaultDistrict = districts.find(
                (district) => district.id === initialValues.order_shipping.district.id
            );
            if (defaultDistrict) {
                formik.setFieldValue("order_shipping.district", defaultDistrict);
            }
        }
    }, [districts]);

    useEffect(() => {
        if (wards.length && initialValues.order_shipping.ward.id) {
            const defaultWard = wards.find(
                (ward) => ward.id === initialValues.order_shipping.ward.id
            );
            if (defaultWard) {
                formik.setFieldValue("order_shipping.ward", defaultWard);
            }
        }
    }, [wards]);

    useEffect(() => {
        if (selectedDistrict?.id) {
            $.getJSON(
                `https://esgoo.net/api-tinhthanh/3/${selectedDistrict.id}.htm`,
                (response) => {
                    if (response.error === 0) {
                        setWards(response.data);
                        // Nếu đã có ward trong `initialValues`, thiết lập lại
                        const defaultWard = response.data.find(
                            (ward) => ward.full_name === initialValues.order_shipping.ward.full_name
                        );
                        if (defaultWard) {
                            setSelectedWard({
                                id: defaultWard.id,
                                full_name: defaultWard.full_name,
                            });
                        }
                    } else {
                        console.error("Error fetching wards:", response.message);
                    }
                }
            );
        }
    }, [selectedDistrict, initialValues]);

    useEffect(() => {
        if (userInfoState?.addresses?.[0]) {
            const address = userInfoState.addresses[0];

            console.log('address', address);

            const defaultProvince = provinces.find(
                (province) => province.name === address.province
            );
            const defaultDistrict = districts.find(
                (district) => district.full_name === address.district
            );
            const defaultWard = wards.find((ward) => ward.full_name === address.ward);

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
            formik.setFieldValue("order_shipping.firstname", address.firstname || "");
            formik.setFieldValue("order_shipping.lastname", address.lastname || "");
        }
    }, [userState, provinces, districts, wards]);

    const prepareApplyDiscountData = {
        discountCode: discountCode,
        cartTotal: subTotal,
        categoryIds: ["6742bb3707599b21b46d375c"],
        brandIds: ["64b2f2e1ea7e3b52f488d10d"],
    };

    const handleApplyCoupon = async () => {
        dispatch(applyDiscount(prepareApplyDiscountData));
    };

    useEffect(() => {
        if (appliedDiscount) {
            toast.success(
                `Mã giảm giá đã được áp dụng: Giảm ${appliedDiscount.discountAmount.toLocaleString()}₫`
            );
        }
    }, [appliedDiscount]);

    useEffect(() => {
        if (userInfoState?.addresses?.[0]) {
            const address = userInfoState.addresses[0];

            const defaultProvince = provinces.find(
                (province) => province.name === address.province.name
            );

            if (defaultProvince) {
                setSelectedProvince({
                    id: defaultProvince.id,
                    name: defaultProvince.name,
                });
            }

            setInitialValues({
                order_shipping: {
                    firstname: address.firstname || "",
                    lastname: address.lastname || "",
                    mobileNo: address.mobileNo || "",
                    province: {
                        id: address.province?.id || "",
                        name: address.province?.name || "",
                    },
                    district: {
                        id: address.district?.id || "",
                        full_name: address.district?.full_name || "",
                    },
                    ward: {
                        id: address.ward?.id || "",
                        full_name: address.ward?.full_name || "",
                    },
                    street: address.street || "",
                },
            });
        }
    }, [userInfoState, provinces]);

    console.log(123, initialValues);

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
                        <p className="user-details">
                            {cart_userId?.name} - {cart_userId?.email}
                        </p>
                        <div className="border rounded p-4 mb-2 row align-items-center">
                            <div className="col">
                                <h4 className="mb-0">Địa chỉ giao hàng</h4>
                            </div>
                            <div className="col-auto">
                                {isEditable ? (
                                    <FaCheck
                                        className="fs-4 cursor-pointer"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setIsEditable(false)}
                                    />
                                ) : (
                                    <FaEdit
                                        className="fs-4 cursor-pointer"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setIsEditable(true)}
                                    />
                                )}
                            </div>
                            <form
                                onSubmit={formik.handleSubmit}
                                className="d-flex gap-15 flex-wrap justify-content-between mt-2"
                            >
                                <div className="flex-grow-1">
                                    <input
                                        type="text"
                                        placeholder="Họ"
                                        className="form-control"
                                        name="order_shipping.lastname"
                                        value={formik.values.order_shipping.lastname}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={!isEditable}
                                    />
                                    <div className="error fail-message mt-1">
                                        {formik.touched.order_shipping?.lastname &&
                                            formik.errors.order_shipping?.lastname}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        type="text"
                                        placeholder="Tên"
                                        className="form-control"
                                        name="order_shipping.firstname"
                                        value={formik.values.order_shipping.firstname}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={!isEditable}
                                    />
                                    <div className="error fail-message mt-1">
                                        {formik.touched.order_shipping?.firstname &&
                                            formik.errors.order_shipping?.firstname}
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
                                        disabled={!isEditable}
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

                                            if (selectedProvince) {
                                                formik.setFieldValue("order_shipping.province", {
                                                    id: selectedProvince.id,
                                                    name: selectedProvince.name,
                                                });
                                                setSelectedProvince({
                                                    id: selectedProvince.id,
                                                    name: selectedProvince.name,
                                                });
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                        disabled={!isEditable}
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
                                            formik.errors.order_shipping?.province?.name &&
                                            formik.errors.order_shipping.province.name}
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

                                            if (selectedDistrict) {
                                                formik.setFieldValue("order_shipping.district", {
                                                    id: selectedDistrict.id,
                                                    full_name: selectedDistrict.full_name,
                                                });
                                                setSelectedDistrict({
                                                    id: selectedDistrict.id,
                                                    full_name: selectedDistrict.full_name,
                                                });

                                                // Reset ward field and options when district changes
                                                formik.setFieldValue("order_shipping.ward", { id: "", full_name: "" });
                                                setWards([]);
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                        disabled={!isEditable || !selectedProvince.id}
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
                                            formik.errors.order_shipping?.district?.full_name &&
                                            formik.errors.order_shipping.district.full_name}
                                    </div>
                                </div>

                                <div className="flex-grow-1">
                                    <select
                                        name="order_shipping.ward"
                                        className="form-control form-select"
                                        value={formik.values.order_shipping.ward.id}
                                        onChange={(e) => {
                                            const selectedWard = wards.find((ward) => ward.id === e.target.value);

                                            if (selectedWard) {
                                                formik.setFieldValue("order_shipping.ward", {
                                                    id: selectedWard.id,
                                                    full_name: selectedWard.full_name,
                                                });
                                                setSelectedWard({
                                                    id: selectedWard.id,
                                                    full_name: selectedWard.full_name,
                                                });
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                        disabled={!isEditable || !selectedDistrict.id}
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
                                            formik.errors.order_shipping?.ward?.full_name &&
                                            formik.errors.order_shipping.ward.full_name}
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
                                        disabled={!isEditable}
                                    />
                                    <div className="error fail-message mt-1">
                                        {formik.touched.order_shipping?.street &&
                                            formik.errors.order_shipping?.street}
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="border rounded p-4 mb-2 row">
                            <h4 className="mb-2">Nhập mã giảm giá</h4>
                            <form className="d-flex flex-column gap-2">
                                <div className="">
                                    <label htmlFor="couponCode" className="form-label fw-bold">
                                        Mã giảm giá
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="couponCode"
                                            placeholder="Nhập mã giảm giá"
                                            value={discountCode}
                                            onChange={(e) => {
                                                setDiscountCode(e.target.value);

                                                if (e.target.value.trim()) {
                                                    setCouponMessage("");
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="button"
                                            onClick={() => {
                                                if (!discountCode.trim()) {
                                                    setCouponMessage("Vui lòng nhập mã giảm giá.");
                                                    setCouponMessageType("danger");
                                                    return;
                                                }
                                                handleApplyCoupon();
                                            }}
                                        >
                                            Áp dụng
                                        </button>
                                    </div>
                                </div>
                                {couponMessage && (
                                    <p
                                        className={`text-${couponMessageType === "success" ? "success" : "danger"
                                            } fw-semibold`}
                                    >
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
                                <button
                                    className="button"
                                    onClick={() => {
                                        formik.handleSubmit();
                                    }}
                                >
                                    Đặt hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-5">
                    <div className="border-bottom py-4 d-flex flex-column gap-30">
                        {userCartState &&
                            userCartState?.data?.cart_products?.map((item, index) => {
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
                                                <h5 className="total">
                                                    {item?.productId?.product_name}
                                                </h5>
                                                {/* TODO: dụt th =))) cái này th cũ ghi vô chơ có quản lí đ mô */}
                                                <p className="partial mb-0">
                                                    {item?.product_color[0]?.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-25 flex-grow-1 d-flex align-items-center justify-content-end">
                                            <h5 className="partial-price mb-0">
                                                {(item?.price).toLocaleString()}₫
                                            </h5>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <div className="border-bottom py-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="partial">Tổng cộng</p>
                            <p className="partial-price">
                                {userCartState?.data?.cart_products
                                    ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
                                    .toLocaleString()}
                                ₫
                            </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-0 partial">Phí vận chuyển</p>
                            <p className="mb-0 partial-price">340,000₫</p>
                        </div>
                        {appliedDiscount?.discountAmount && (
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 partial">
                                    Voucher giảm giá{" "}
                                    <span style={{ color: "#26a99a" }}>
                                        {appliedDiscount?.discount_type === "percentage"
                                            ? `(${appliedDiscount?.discount_value}%)`
                                            : `(${appliedDiscount?.discount_value.toLocaleString()}₫)`}
                                    </span>
                                </p>
                                <p className="mb-0 partial-price" style={{ color: "#26a99a" }}>
                                    -{appliedDiscount?.discountAmount.toLocaleString()}₫
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                        <h4 className="total">Tổng cộng (bao gồm phí vận chuyển và VAT)</h4>
                        <h5 className="total-price">
                            {(
                                userCartState?.data?.cart_products?.reduce(
                                    (acc, item) => acc + item.price * item.quantity,
                                    0
                                ) + 340000
                            ).toLocaleString()}
                            ₫
                        </h5>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Checkout;
