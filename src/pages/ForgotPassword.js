import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { forgotPasswordToken } from "../features/user/userSlice";

const emailSchema = yup.object({
    email: yup
        .string()
        .email("Địa chỉ email không hợp lệ")
        .required("Chưa nhập địa chỉ email"),
});

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: emailSchema,
        onSubmit: (values) => {
            dispatch(forgotPasswordToken(values));

            navigate("/");
        },
    });

    return (
        <>
            <Meta title={"Quên mật khẩu"} />
            <BreadCrumb title="Quên mật khẩu" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h2 className="text-center fw-bold mb-3">Quên mật khẩu</h2>
                            <p className="text-center my-2 mb-4">
                            Nhập email của bạn để nhận đường dẫn khôi phục mật khẩu
                            </p>
                            <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-2">
                                <CustomInput
                                    type="email"
                                    name="email"
                                    placeholder="Địa chỉ email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="error fail-message">
                                    {formik.touched.email && formik.errors.email}
                                </div>
                                <div className="d-flex justify-content-center flex-column gap-15 align-items-center">
                                    <button type="submit" className="button border-0">
                                        Gửi
                                    </button>
                                    <Link to="/login">Quay lại</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ForgotPassword;
