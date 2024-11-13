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
        .email("Email should be valid")
        .required("Email is required"),
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
            <Meta title={"Forgot password"} />
            <BreadCrumb title="Forgot password" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Reset your password</h3>
                            <p className="text-center my-2 mb-4">
                                We will sent you an email to reset your password
                            </p>
                            <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-2">
                                <CustomInput
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="error fail-message">
                                    {formik.touched.email && formik.errors.email}
                                </div>
                                <div className="d-flex justify-content-center flex-column gap-15 align-items-center">
                                    <button type="submit" className="button border-0">
                                        Submit
                                    </button>
                                    <Link to="/login">Cancel</Link>
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
