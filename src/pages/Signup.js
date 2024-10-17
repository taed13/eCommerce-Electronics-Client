import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/user/userSlice";

const singupSchema = yup.object({
    firstname: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    email: yup.string().nullable().email().required("Email is required"),
    mobile: yup.string().required("Mobile number is required"),
    password: yup.string().required("Password is required"),
});

const Signup = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            mobile: "",
            password: "",
        },
        validationSchema: singupSchema,
        onSubmit: (values) => {
            dispatch(registerUser(values));
        },
    });
    return (
        <>
            <Meta title={"Signup"} />
            <BreadCrumb title="Signup" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Create account</h3>
                            <form
                                action=""
                                onSubmit={formik.handleSubmit}
                                className="d-flex flex-column gap-15"
                            >
                                <CustomInput
                                    type="text"
                                    name="firstname"
                                    placeholder="First Name"
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange("firstname")}
                                    onBlur={formik.handleBlur("firstname")}
                                />
                                <div className="error text-danger">
                                    {formik.touched.firstname && formik.errors.firstname}
                                </div>

                                <CustomInput
                                    type="text"
                                    name="lastname"
                                    placeholder="Last Name"
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange("lastname")}
                                    onBlur={formik.handleBlur("lastname")}
                                />
                                <div className="error text-danger">
                                    {formik.touched.lastname && formik.errors.lastname}
                                </div>

                                <CustomInput
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                />
                                <div className="error text-danger">
                                    {formik.touched.email && formik.errors.email}
                                </div>

                                <CustomInput
                                    type="tel"
                                    name="mobile"
                                    placeholder="Mobile number"
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange("mobile")}
                                    onBlur={formik.handleBlur("mobile")}
                                />
                                <div className="error text-danger">
                                    {formik.touched.mobile && formik.errors.mobile}
                                </div>

                                <CustomInput
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                />
                                <div className="error text-danger">
                                    {formik.touched.password && formik.errors.password}
                                </div>

                                <div className="mt-3 d-flex justify-content-center flex-column align-items-center gap-15">
                                    <button className="button border-0">Create</button>
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

export default Signup;
