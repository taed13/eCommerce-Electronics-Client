import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiInfoCircle, BiPhoneCall } from "react-icons/bi";
import Container from "../components/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createQuery, getAProduct, resetState } from "../features/contact/contactSlice";
import { useNavigate } from "react-router-dom";
import { IoIosSend } from "react-icons/io";

const Contact = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productLink, setProductLink] = useState("");
    const [productIdForSubmitting, setProductIdForSubmitting] = useState("");
    const [productLinkMessage, setProductLinkMessage] = useState("");
    const [productLinkMessageType, setProductLinkMessageType] = useState("");
    const product = useSelector((state) => state?.contact?.singleproduct);

    useEffect(() => {
        dispatch(resetState());
    }, [dispatch]);

    useEffect(() => {
        if (product) {
            setProductIdForSubmitting(product._id);
            setProductLinkMessage("Tìm sản phẩm thành công.");
            setProductLinkMessageType("success");
        }
    }, [product]);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            comment: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Tên không được để trống"),
            email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
            mobile: yup
                .string()
                .required("Số điện thoại không được để trống")
                .matches(
                    /^[0-9]{10}$/,
                    "Số điện thoại không hợp lệ, vui lòng nhập đúng 10 số"
                ),
            comment: yup.string().required("Nội dung không được để trống"),
        }),
        onSubmit: (values) => {
            const queryData = { ...values };

            if (product) {
                queryData.productDetails = {
                    name: product.product_name,
                    brand: product.product_brand[0].title,
                    price: product.product_price.toLocaleString(),
                    imageUrl: product.product_images[0]?.url,
                };
            }

            dispatch(createQuery(queryData));
            formik.resetForm();
            // navigate("/");
            window.scrollTo(0, 0);
        }
    });

    const handleApplyProductLink = async (productLink) => {
        const productPath = "/product/";
        if (productLink.includes(productPath)) {
            const productIdFromLink = productLink.split(productPath)[1];
            if (productIdFromLink) {
                dispatch(getAProduct(productIdFromLink));
            } else {
                setProductLinkMessage("Sản phẩm không tồn tại.");
                setProductLinkMessageType("danger");
            }
        } else {
            setProductLinkMessage("Đường dẫn sản phẩm không hợp lệ.");
            setProductLinkMessageType("danger");
        }
    };

    return (
        <>
            <Meta title={"Electronics | Liên hệ chúng tôi"} />
            <BreadCrumb title="Liên hệ chúng tôi" />
            <Container class1="contact-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-6">
                        <iframe
                            title="map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.2212222470557!2d108.21499467581557!3d16.05400603984387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c88ef7d043%3A0x77d9f3ee1be51731!2zMzkwIEhvw6BuZyBEaeG7h3UsIELDrG5oIFRodeG6rW4sIFEuIEjhuqNpIENow6J1LCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1713679658800!5m2!1svi!2s"
                            width="300"
                            height="450"
                            className="border-0 w-100"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="contact-inner-wrapper d-flex flex-column justify-content-center col-6">
                        <h3 className="contact-title mb-4">Về chúng tôi</h3>
                        <div className="w-100">
                            <ul className="ps-0">
                                <li className="mb-3 d-flex align-items-center gap-15">
                                    <AiOutlineHome className="fs-5" />
                                    <address className="mb-0">
                                        390 Hoàng Diệu, Bình Thuận, Hải Châu, Đà Nẵng
                                    </address>
                                </li>
                                <li className="mb-3 d-flex gap-15 align-items-center">
                                    <BiPhoneCall className="fs-5" />
                                    <a href="tel: +84 989 112 223">+84 989 112 223</a>
                                </li>
                                <li className="mb-3 d-flex gap-15 align-items-center">
                                    <AiOutlineMail className="fs-5" />
                                    <a href="mailto: tancuynh@gmail.com">
                                        support@electronics.com
                                    </a>
                                </li>
                                <li className="mb-3 d-flex gap-15 align-items-center">
                                    <BiInfoCircle className="fs-5" />
                                    <p className="mb-0">Thứ 2 - Thứ 6 10AM - 8PM</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 mt-5">
                        <div className="contact-inner-wrapper d-flex justify-content-between">
                            <div>
                                <h3 className="contact-title mb-4">Liên hệ</h3>
                                <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15" >
                                    <div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tên"
                                            name="name"
                                            onChange={formik.handleChange("name")}
                                            onBlur={formik.handleBlur("name")}
                                            value={formik.values.name}
                                        />
                                        <div className="error fail-message">
                                            {formik.touched.name && formik.errors.name}
                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Địa chỉ email"
                                            name="email"
                                            onChange={formik.handleChange("email")}
                                            onBlur={formik.handleBlur("email")}
                                            value={formik.values.email}
                                        />
                                        <div className="error fail-message">
                                            {formik.touched.email && formik.errors.email}
                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            placeholder="Số điện thoại"
                                            name="mobile"
                                            onChange={formik.handleChange("mobile")}
                                            onBlur={formik.handleBlur("mobile")}
                                            value={formik.values.mobile}
                                        />
                                        <div className="error fail-message">
                                            {formik.touched.mobile && formik.errors.mobile}
                                        </div>
                                    </div>
                                    <div>
                                        <textarea
                                            id=""
                                            className="form-control w-100"
                                            cols="30"
                                            rows="4"
                                            placeholder="Nội dung"
                                            name="comment"
                                            onChange={formik.handleChange("comment")}
                                            onBlur={formik.handleBlur("comment")}
                                            value={formik.values.comment}
                                        ></textarea>
                                        <div className="error fail-message">
                                            {formik.touched.comment && formik.errors.comment}
                                        </div>
                                    </div>
                                    {productIdForSubmitting && (
                                        <input
                                            type="hidden"
                                            name="productId"
                                            value={productIdForSubmitting}
                                        />
                                    )}
                                    <div>
                                        <button type="submit" className="button border-0 d-flex align-items-center">
                                            <IoIosSend className="me-2 fs-6" />
                                            Gửi đơn
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <h3 className="contact-title mb-4">Link sản phẩm (nếu có)</h3>
                                <form className="d-flex flex-column gap-2">
                                    <div className="">
                                        <label htmlFor="productLink" className="form-label fw-bold">
                                            Đường dẫn sản phẩm
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="productLink"
                                                placeholder="Nhập đường dẫn sản phẩm"
                                                value={productLink}
                                                onChange={(e) => {
                                                    setProductLink(e.target.value);
                                                    if (e.target.value.trim()) {
                                                        setProductLinkMessage("");
                                                    }
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className="button"
                                                onClick={() => {
                                                    if (!productLink.trim()) {
                                                        setProductLinkMessage("Vui lòng nhập đường dẫn sản phẩm");
                                                        setProductLinkMessageType("danger");
                                                        return;
                                                    }
                                                    handleApplyProductLink(productLink);
                                                }}
                                            >
                                                Kiểm tra
                                            </button>
                                        </div>
                                    </div>
                                    {productLinkMessage && (
                                        <p
                                            className={`text-${productLinkMessageType === "success" ? "success" : "danger"
                                                } fw-semibold`}
                                        >
                                            {productLinkMessage}
                                        </p>
                                    )}
                                </form>
                                {
                                    product && (
                                        <div className="d-flex justify-content-start align-items-center gap-3">
                                            <div className="mt-3">
                                                <span className="form-label fw-bold">Thông tin sản phẩm</span>
                                                <p className=" mt-2 mb-2">{product.product_brand[0].title} - {product.product_name}</p>
                                                <p className="mb-0">Đơn giá: ₫{product.product_price.toLocaleString()}</p>
                                            </div>
                                            <div className="">
                                                <img src={product?.product_images[0].url} alt={product.product_name} style={{ width: 'auto', height: '200px' }} className="img-fluid" />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Contact;