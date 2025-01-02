import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, getInfoByEmailAddress } from "../features/user/userSlice";
import { loginRoute } from "../utils/APIRoutes";

const loginSchema = yup.object({
    email: yup
        .string()
        .email("Địa chỉ email không hợp lệ")
        .required("Vui lòng nhập địa chỉ email"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
});

const getOauthGoogleUrl = () => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        redirect_uri: "https://e-commerce-electronics-server-ruddy.vercel.app/api/oauth2/google",
        client_id:
            "538110948524-guvdofrlikf607jsmh53vjaiibrlvvr5.apps.googleusercontent.com",
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    };
    const qs = new URLSearchParams(options);
    return `${rootUrl}?${qs.toString()}`;
};

const Login = () => {
    const [email, setEmail] = useState("");
    const oauthURL = getOauthGoogleUrl();
    const [password, setPassword] = useState("");
    const authState = useSelector((state) => state?.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (authState?.isSuccess) {
            navigate("/");
            window.scrollTo(0, 0);
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

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("access_token");
        const refreshToken = urlParams.get("refresh_token");

        if (accessToken && refreshToken) {
            localStorage.setItem("token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);

            const decoded = JSON.parse(atob(accessToken.split(".")[1]));
            console.log("Decoded Token:", decoded.email);

            dispatch(getInfoByEmailAddress(decoded.email));

            window.history.replaceState({}, document.title, "/");
            navigate("/");
        }
    }, [navigate, authState?.userInfo?.user]);

    return (
        <>
            <Meta title={"Electronics | Đăng nhập"} />
            <BreadCrumb title="Đăng nhập" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card shadow-lg">
                            <h2 className="text-center fw-bold mb-3">Đăng nhập</h2>
                            <p className="text-center mb-5">
                                vào tài khoản Electronics của bạn
                            </p>
                            <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-2">
                                <CustomInput
                                    type="email"
                                    name="email"
                                    placeholder="Địa chỉ email"
                                    value={formik.values.email}
                                    onChange={(e) => {
                                        formik.handleChange("email")(e);
                                        setEmail(e.target.value);
                                    }}
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

                                <div className="d-flex justify-content-end">
                                    <Link to="/forgot-password" className="hover-underline">
                                        Quên mật khẩu?
                                    </Link>
                                </div>

                                <div className="d-flex justify-content-center align-items-center gap-3">
                                    <button type="submit" className={`button border-0 ${!email && !password ? "disabled" : ""}`}>
                                        Đăng nhập
                                    </button>
                                </div>
                            </form>
                            <p className="text-center mt-3">hoặc</p>
                            <div className="d-flex justify-content-center align-items-center m-3">
                                <Link to={oauthURL} className="bg-light border-0 rounded d-flex align-items-center justify-content-center p-2 px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 326667 333333"
                                        shapeRendering="geometricPrecision"
                                        textRendering="geometricPrecision"
                                        imageRendering="optimizeQuality"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        width={40}
                                        height={20}
                                    >
                                        <path
                                            d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
                                            fill="#4285f4"
                                        />
                                        <path
                                            d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
                                            fill="#34a853"
                                        />
                                        <path
                                            d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
                                            fill="#fbbc04"
                                        />
                                        <path
                                            d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
                                            fill="#ea4335"
                                        />
                                    </svg>
                                    <h3 className="align-items-center d-flex justify-content-center m-0 ml-2">
                                        Google
                                    </h3>
                                </Link>
                            </div>

                            <div className="d-flex gap-1 justify-content-center align-items-baseline">
                                <p className="text-center mt-2">Bạn mới biết đến Electronics?</p>
                                <Link to="/signup" className="text-primary hover-underline">Đăng ký</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Login;
