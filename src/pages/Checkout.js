import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../utils/axiosConfig";

const shippingSchema = yup.object({
    order_shipping: yup.object({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        address: yup.string().required("Address is required"),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        country: yup.string().required("Country is required"),
        pincode: yup.string().required("Pincode is required"),
        other: yup.string(),
    }),
});

const Checkout = () => {
    const dispatch = useDispatch();
    const userCartState = useSelector((state) => state.auth?.cartProducts);
    const [subTotal, setSubTotal] = useState(0);
    const [countryList, setCountryList] = useState([]);
    const [shippingInfo, setShippingInfo] = useState({});

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("https://restcountries.com/v3.1/all");
                setCountryList(response.data);
            } catch (error) {
                console.error("Error fetching country list:", error);
            }
        };

        fetchCountries();
    }, []);

    console.log("CART STATE:::");
    console.log(userCartState);

    useEffect(() => {
        let sum = 0;
        userCartState?.data?.cart_products?.forEach((item) => {
            sum += Number(item?.price) * Number(item?.quantity);
        });
        setSubTotal(sum);
    }, [userCartState]);

    const formik = useFormik({
        initialValues: {
            order_shipping: {
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                state: "",
                country: "",
                pincode: "",
                other: "",
            },
        },
        validationSchema: shippingSchema,
        onSubmit: (values) => {
            console.log("Submitted Values:", values);
            setShippingInfo(values);
            // checkOutHandler(values);
            // navigate("/");
        },
    });

    const checkOutHandler = async (values) => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:5001/api/user/order/purchase",
                {
                    items: userCartState, // Send cart items
                    shippingInfo: values, // Include shipping information
                },
                config
            ); // Include any necessary config if required

            // Redirect to the checkout URL returned from your server
            window.location = response.data.url;
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("An error occurred during checkout. Please try again."); // User-friendly error message
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
                                        Cart
                                    </Link>
                                </li>
                                &nbsp; /
                                <li className="breadcrumb-item partial-price active">
                                    Information
                                </li>
                                &nbsp; /
                                <li className="breadcrumb-item partial-price active">
                                    Shipping
                                </li>
                                &nbsp; /
                                <li
                                    className="breadcrumb-item partial-price active"
                                    aria-current="page"
                                >
                                    Payment
                                </li>
                            </ol>
                        </nav>
                        <h4 className="title total">Thông tin liên hệ</h4>
                        <p className="user-details">John Doe (johndoe101@gmail.com)</p>
                        <h4 className="mb-3">Địa chỉ giao hàng</h4>
                        <form
                            onSubmit={formik.handleSubmit}
                            className="d-flex gap-15 flex-wrap justify-content-between"
                        >
                            <div className="w-100">
                                <select
                                    name="order_shipping.country"
                                    className="form-control form-select"
                                    value={formik.values.order_shipping.country}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="" disabled>
                                        Select Country
                                    </option>
                                    {countryList.map((country, index) => (
                                        <option key={index} value={country.name.common}>
                                            {country.name.common}
                                        </option>
                                    ))}
                                </select>
                                <div className="error fail-message mt-1">
                                    {formik.touched.order_shipping?.country &&
                                        formik.errors.order_shipping?.country}
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <input
                                    type="text"
                                    placeholder="First name"
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
                            <div className="flex-grow-1">
                                <input
                                    type="text"
                                    placeholder="Last name"
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
                            <div className="w-100">
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="form-control"
                                    name="order_shipping.address"
                                    value={formik.values.order_shipping.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="error fail-message mt-1">
                                    {formik.touched.order_shipping?.address &&
                                        formik.errors.order_shipping?.address}
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <input
                                    type="text"
                                    placeholder="City"
                                    className="form-control"
                                    name="order_shipping.city"
                                    value={formik.values.order_shipping.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="error fail-message mt-1">
                                    {formik.touched.order_shipping?.city &&
                                        formik.errors.order_shipping?.city}
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <select
                                    name="order_shipping.state"
                                    className="form-control form-select"
                                    value={formik.values.order_shipping.state}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="" disabled>
                                        Select state
                                    </option>
                                    <option value="State 1">State 1</option>
                                    <option value="State 2">State 2</option>
                                </select>
                                <div className="error fail-message mt-1">
                                    {formik.touched.order_shipping?.state &&
                                        formik.errors.order_shipping?.state}
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <input
                                    type="text"
                                    placeholder="Zipcode"
                                    className="form-control"
                                    name="order_shipping.pincode"
                                    value={formik.values.order_shipping.pincode}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="error fail-message mt-1">
                                    {formik.touched.order_shipping?.pincode &&
                                        formik.errors.order_shipping?.pincode}
                                </div>
                            </div>
                            <div className="w-100">
                                <input
                                    type="text"
                                    placeholder="Apartment, suite, etc.. (optional)"
                                    className="form-control"
                                    name="order_shipping.other"
                                    value={formik.values.order_shipping.other}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="error fail-message mt-1">
                                    {formik.touched.order_shipping?.other &&
                                        formik.errors.order_shipping?.other}
                                </div>
                            </div>
                            <div className="w-100">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link
                                        to="/cart"
                                        className="text-dark d-flex align-items-center hover-underline"
                                    >
                                        <IoIosArrowBack className="fs-5 me-1" />
                                        Return to cart
                                    </Link>
                                    <button className="button" type="submit">
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </form>
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
                                                {/* TODO: size??? */}
                                                <p className="partial mb-0">
                                                    S | {item?.product_color[0]?.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-25 flex-grow-1 d-flex align-items-center justify-content-end">
                                            <h5 className="partial-price mb-0">$ {item?.price}</h5>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <div className="border-bottom py-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="partial">Tổng cộng</p>
                            <p className="partial-price">
                                ${" "}
                                {userCartState?.data?.cart_products?.reduce(
                                    (acc, item) => acc + item.price * item.quantity,
                                    0
                                )}
                            </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-0 partial">Phí vận chuyển</p>
                            <p className="mb-0 partial-price">$ 34</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                        <h4 className="total">Tổng cộng (bao gồm phí vận chuyển)</h4>
                        <h5 className="total-price">
                            ${" "}
                            {userCartState?.data?.cart_products?.reduce(
                                (acc, item) => acc + item.price * item.quantity,
                                0
                            ) + 34}
                        </h5>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Checkout;
