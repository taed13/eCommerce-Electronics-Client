import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userSlice";

const signupSchema = yup.object({
    firstname: yup.string().required("Họ không được để trống"),
    lastname: yup.string().required("Tên không được để trống"),
    email: yup.string().nullable().email().required("Email không được để trống"),
    mobile: yup.string().required("Số điện thoại không được để trống"),
    password: yup.string().required("Mật khẩu không được để trống"),
});

const Signup = () => {
    const authState = useSelector((state) => state?.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            mobile: "",
            password: "",
        },
        validationSchema: signupSchema,
        onSubmit: (values) => {
            dispatch(registerUser(values));
        },
    });
    // useEffect(() => {
    //     if (authState.createdUser !== null && authState.isError === false) {
    //         navigate("/login");
    //         // window.location.reload();
    //     }
    // }, [authState]);
    return (
        <>
            <Meta title={"Đăng ký tài khoản"} />
            <BreadCrumb title="Đăng ký tài khoản" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card shadow-lg">
                            <h2 className="text-center fw-bold mb-2">Đăng ký</h2>
                            <p className="text-center mb-5">
                                Tài khoản Electronics mới của bạn
                            </p>
                            <form
                                action=""
                                onSubmit={formik.handleSubmit}
                                className="d-flex flex-column gap-10"
                            >
                                <div className="d-flex gap-2">
                                    <div className="d-flex flex-column gap-2 w-50">
                                        <CustomInput
                                            type="text"
                                            name="firstname"
                                            placeholder="Họ"
                                            value={formik.values.firstname}
                                            onChange={formik.handleChange("firstname")}
                                            onBlur={formik.handleBlur("firstname")}
                                        />
                                        <div className="error fail-message">
                                            {formik.touched.firstname && formik.errors.firstname}
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column gap-2 w-50">
                                        <CustomInput
                                            type="text"
                                            name="lastname"
                                            placeholder="Tên"
                                            value={formik.values.lastname}
                                            onChange={formik.handleChange("lastname")}
                                            onBlur={formik.handleBlur("lastname")}
                                        />
                                        <div className="error fail-message">
                                            {formik.touched.lastname && formik.errors.lastname}
                                        </div>
                                    </div>
                                </div>

                                <CustomInput
                                    type="email"
                                    name="email"
                                    placeholder="Địa chỉ email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                />
                                <div className="error fail-message">
                                    {formik.touched.email && formik.errors.email}
                                </div>

                                <CustomInput
                                    type="tel"
                                    name="mobile"
                                    placeholder="Số điện thoại"
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange("mobile")}
                                    onBlur={formik.handleBlur("mobile")}
                                />
                                <div className="error fail-message">
                                    {formik.touched.mobile && formik.errors.mobile}
                                </div>

                                <CustomInput
                                    type="password"
                                    name="password"
                                    placeholder="Mật khẩu"
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                />
                                <div className="error fail-message">
                                    {formik.touched.password && formik.errors.password}
                                </div>

                                <div className="d-flex justify-content-center flex-row align-items-center gap-5 mt-3">
                                    <button className="button border-0">Xác nhận</button>
                                    <Link className="hover-underline" to="/login">Quay lại</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Signup;
