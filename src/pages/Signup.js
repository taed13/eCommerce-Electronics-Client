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
    name: yup.string().required("Vui lòng nhập tên của bạn"),
    email: yup.string().email("Địa chỉ email không hợp lệ").required("Vui lòng nhập địa chỉ email"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
        .required('Vui lòng xác nhận mật khẩu'),
});

const Signup = () => {
    const authState = useSelector((state) => state?.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: signupSchema,
        onSubmit: (values) => {
            dispatch(registerUser(values));
        },
    });

    useEffect(() => {
        if (authState.isSuccess && authState.createdUser) {
            formik.resetForm(); // Reset form sau khi thành công
        }
    }, [authState.isSuccess]);
    
    return (
        <>
            <Meta title={"Electronics | Đăng ký tài khoản"} />
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
                                <CustomInput
                                    type="text"
                                    name="name"
                                    placeholder="Tên tài khoản"
                                    value={formik.values.name}
                                    onChange={formik.handleChange("name")}
                                    onBlur={formik.handleBlur("name")}
                                />
                                <div className="error fail-message">
                                    {formik.touched.name && formik.errors.name}
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

                                <CustomInput
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Xác nhận mật khẩu"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange("confirmPassword")}
                                    onBlur={formik.handleBlur("confirmPassword")}
                                />
                                <div className="error fail-message">
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword}
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