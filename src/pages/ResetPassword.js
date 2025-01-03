import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/user/userSlice";

const resetPasswordSchema = yup.object({
    password: yup.string().required("Password is required"),
    confpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ResetPassword = () => {
    const location = useLocation();
    const getToken = location.pathname.split("/")[2];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            password: "",
            confpassword: "",
        },
        validationSchema: resetPasswordSchema,
        onSubmit: async (values) => {
            try {
                await dispatch(resetPassword({ token: getToken, password: values.password })).unwrap();
                navigate("/login", { replace: true });
            } catch (error) {
                console.error("Đặt lại mật khẩu thất bại:", error);
                alert("Đặt lại mật khẩu thất bại. Vui lòng kiểm tra lại.");
            }
        },
    });
    
    return (
        <>
            <Meta title={"Đặt lại mật khẩu"} />
            <BreadCrumb title="Đặt lại mật khẩu" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Đặt lại mật khẩu</h3>
                            <form
                                action=""
                                onSubmit={formik.handleSubmit}
                                className="d-flex flex-column gap-15"
                            >
                                <CustomInput
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                />
                                <div className="errors">
                                    {formik.touched.password && formik.errors.password}
                                </div>

                                <CustomInput
                                    type="password"
                                    name="confpassword"
                                    placeholder="Confirm password"
                                    value={formik.values.confpassword}
                                    onChange={formik.handleChange("confpassword")}
                                    onBlur={formik.handleBlur("confpassword")}
                                />
                                <div className="errors">
                                    {formik.touched.confpassword && formik.errors.confpassword}
                                </div>

                                <div className="mt-3 d-flex justify-content-center flex-column align-items-center gap-15">
                                    <button className="button border-0">Đặt lại mật khẩu</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ResetPassword;
