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
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    pincode: yup.string().required("Pincode is required"),
    other: yup.string(),
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

    console.log("CART STATE");
    console.log(userCartState);

    useEffect(() => {
        let sum = 0;
        userCartState?.forEach((item) => {
            sum += Number(item?.price) * Number(item?.quantity);
        });
        setSubTotal(sum);
    }, [userCartState]);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
            other: "",
        },
        validationSchema: shippingSchema,
        onSubmit: (values) => {
            setShippingInfo(values);
            checkOutHandler(values);
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
        <>
            <Container class1="checkout-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-7">
                        <div className="checkout-left-data">
                            <h3 className="website-name">Electroholic</h3>
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
                            <h4 className="title total">Contact Information</h4>
                            <p className="user-details">John Doe (johndoe101@gmail.com)</p>
                            <h4 className="mb-3">Shipping address</h4>
                            <form
                                onSubmit={formik.handleSubmit}
                                action=""
                                className="d-flex gap-15 flex-wrap justify-content-between"
                            >
                                <div className="w-100">
                                    <select
                                        name="country"
                                        className="form-control form-select"
                                        id=""
                                        value={formik.values.country}
                                        onChange={formik.handleChange("country")}
                                        onBlur={formik.handleBlur("country")}
                                    >
                                        <option value="" selected disabled>
                                            Select Country
                                        </option>
                                        {countryList.map((country, index) => {
                                            return (
                                                <option key={index} value={country.name.common}>
                                                    {country.name.common}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <div className="error fail-message mt-1">
                                        {formik.touched.country && formik.errors.country}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        type="text"
                                        placeholder="First name"
                                        className="form-control"
                                        name="firstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange("firstName")}
                                        onBlur={formik.handleBlur("firstName")}
                                    />
                                    <div className="error fail-message mt-1">
                                        {formik.touched.firstName && formik.errors.firstName}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        className="form-control"
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange("lastName")}
                                        onBlur={formik.handleBlur("lastName")}
                                    />
                                    <div className="error fail-message mt-1">
                                        {formik.touched.lastName && formik.errors.lastName}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className="form-control"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange("address")}
                                        onBlur={formik.handleBlur("address")}
                                    />
                                    <div className="error fail-message mt-1">
                                        {formik.touched.address && formik.errors.address}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input
                                        type="text"
                                        placeholder="Apartment, suite, etc.. (optional)"
                                        className="form-control"
                                        name="other"
                                        value={formik.values.other}
                                        onChange={formik.handleChange("other")}
                                        onBlur={formik.handleBlur("other")}
                                    />
                                    <div className="error fail-message mt-1">
                                        {formik.touched.other && formik.errors.other}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        className="form-control"
                                        name="city"
                                        value={formik.values.city}
                                        onChange={formik.handleChange("city")}
                                        onBlur={formik.handleBlur("city")}
                                    />
                                    <div className="error fail-message mt-1">
                                        {formik.touched.city && formik.errors.city}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <select
                                        name="state"
                                        className="form-control form-select"
                                        id="state"
                                        value={formik.values.state}
                                        onChange={formik.handleChange("state")}
                                        onBlur={formik.handleBlur("state")}
                                    >
                                        <option value="" selected disabled>
                                            Select state
                                        </option>
                                        <option value="1">State 1</option>
                                        <option value="2">State 2</option>
                                    </select>
                                    <div className="error fail-message mt-1">
                                        {formik.touched.state && formik.errors.state}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        type="text"
                                        placeholder="Zipcode"
                                        className="form-control"
                                        name="pincode"
                                        value={formik.values.pincode}
                                        onChange={formik.handleChange("pincode")}
                                        onBlur={formik.handleBlur("pincode")}
                                    />
                                    <div className="error fail-message mt-1">
                                        {formik.touched.pincode && formik.errors.pincode}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link to="/cart" className="text-dark d-flex align-items-center hover-underline">
                                            <IoIosArrowBack className="fs-5 me-1" />
                                            Return to cart
                                        </Link>
                                        <Link to="/cart" className="button">
                                            Continue to shipping
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
                            {userCartState &&
                                userCartState?.map((item, index) => {
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
                                                        src={item?.productId?.images[0]?.url}
                                                        className="img-fluid"
                                                        alt="product"
                                                    />
                                                </div>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <h5 className="total">{item?.productId?.title}</h5>
                                                    {/* TODO: size??? */}
                                                    <p className="partial mb-0">
                                                        S | {item?.color.title}
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
                                <p className="partial">Subtotal</p>
                                <p className="partial-price">
                                    ${" "}
                                    {userCartState?.reduce(
                                        (acc, item) => acc + item.price * item.quantity,
                                        0
                                    )}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 partial">Shipping</p>
                                <p className="mb-0 partial-price">$ 34</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                            <h4 className="total">Total</h4>
                            <h5 className="total-price">
                                ${" "}
                                {userCartState?.reduce(
                                    (acc, item) => acc + item.price * item.quantity,
                                    0
                                ) + 34}
                            </h5>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Checkout;
