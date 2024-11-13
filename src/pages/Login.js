import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";

const loginSchema = yup.object({
    email: yup
        .string()
        .email("Email should be valid")
        .required("Email is required"),
    password: yup.string().required("Password is required"),
});

const Login = () => {
    const authState = useSelector((state) => state?.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (authState?.isSuccess) {
            navigate("/");
        }
    }, [authState, navigate]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            dispatch(loginUser(values));
            // navigate("/");
        },
    });
    return (
        <>
            <Meta title={"Login"} />
            <BreadCrumb title="Login" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card shadow-lg">
                            <h3 className="text-center mb-4">Login</h3>
                            <form
                                action=""
                                onSubmit={formik.handleSubmit}
                                className="d-flex flex-column gap-10"
                            >
                                <CustomInput
                                    type="email"
                                    name="email"
                                    placeholder="Email"
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
                                    placeholder="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                />
                                <div className="error fail-message">
                                    {formik.touched.password && formik.errors.password}
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Link to="/forgot-password" className="forgot-password-link">Forgot password?</Link>
                                </div>
                                <div className="mt-2 d-flex justify-content-center align-items-center gap-15">
                                    <button type="submit" className="button border-0">
                                        Login
                                    </button>
                                    <Link to="/signup" className="button signup">
                                        Signup
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Login;
