import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiInfoCircle, BiPhoneCall } from "react-icons/bi";
import Container from "../components/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createQuery } from "../features/contact/contactSlice";
const Contact = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            comments: "",
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
            comments: yup.string().required("Nội dung không được để trống"),
        }),
        onSubmit: (values) => {
            dispatch(createQuery(values));
            formik.resetForm();
        },
    });
    return (
        <>
            <Meta title={"Liên hệ chúng tôi"} />
            <BreadCrumb title="Liên hệ chúng tôi" />
            <Container class1="contact-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <iframe
                            title="map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.2212222470557!2d108.21499467581557!3d16.05400603984387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c88ef7d043%3A0x77d9f3ee1be51731!2zMzkwIEhvw6BuZyBEaeG7h3UsIELDrG5oIFRodeG6rW4sIFEuIEjhuqNpIENow6J1LCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1713679658800!5m2!1svi!2s"
                            width="600"
                            height="450"
                            className="border-0 w-100"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
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
                                            name="comments"
                                            onChange={formik.handleChange("comments")}
                                            onBlur={formik.handleBlur("comments")}
                                            value={formik.values.comments}
                                        ></textarea>
                                        <div className="error fail-message">
                                            {formik.touched.comments && formik.errors.comments}
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className="button border-0">
                                            Gửi đơn
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <h3 className="contact-title mb-4">Hoặc liên hệ tới chúng tôi từ</h3>
                                <div>
                                    <ul className="ps-0">
                                        <li className="mb-3 d-flex align-items-center gap-15">
                                            <AiOutlineHome className="fs-5" />
                                            <address className="mb-0">
                                                12 Hàm Nghi, Hải Châu, Đà Nẵng
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
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Contact;
