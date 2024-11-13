import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/user/userSlice";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

const profileSchema = yup.object({
    firstname: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    mobile: yup.string().required("Mobile number is required"),
});

const Profile = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.auth.user);
    const userInfoState = useSelector((state) => state.auth?.userInfo?.user);
    const [edit, setEdit] = useState(true);
    const [initialValues, setInitialValues] = useState({
        firstname: userState?.firstname || "",
        lastname: userState?.lastname || "",
        email: userState?.email || userInfoState?.email ||"",
        mobile: userState?.mobile || "",
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: profileSchema,
        onSubmit: (values) => {
            dispatch(updateProfile(values));
            setEdit(true);
        },
    });

    useEffect(() => {
        if (!edit) {
            formik.setTouched({});
        }
    }, [edit]);

    const handleCancel = () => {
        formik.resetForm();
        setEdit(true);
    };

    return (
        <>
            <BreadCrumb title="My Profile" />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-start">
                            {edit ? (
                                <h3 className="mb-4">My Profile</h3>
                            ) : (
                                <h3 className="mb-4">Update Profile</h3>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="d-flex gap-2">
                                <div className="mb-3 w-50">
                                    <label htmlFor="firstname" className="form-label">
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        className="form-control"
                                        id="firstname"
                                        disabled={edit}
                                        value={formik.values.firstname}
                                        onChange={formik.handleChange("firstname")}
                                        onBlur={formik.handleBlur("firstname")}
                                    />
                                    <div className="errors fail-message mt-2">
                                        {formik.touched.firstname && formik.errors.firstname}
                                    </div>
                                </div>
                                <div className="mb-3 w-50">
                                    <label htmlFor="lastname" className="form-label">
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        className="form-control"
                                        id="lastname"
                                        disabled={edit}
                                        value={formik.values.lastname}
                                        onChange={formik.handleChange("lastname")}
                                        onBlur={formik.handleBlur("lastname")}
                                    />
                                    <div className="errors fail-message mt-2">
                                        {formik.touched.lastname && formik.errors.lastname}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    id="email"
                                    disabled={edit}
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                />
                                <div className="errors fail-message mt-2">
                                    {formik.touched.email && formik.errors.email}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mobile" className="form-label">
                                    Mobile number
                                </label>
                                <input
                                    type="text"
                                    name="mobile"
                                    className="form-control"
                                    id="mobile"
                                    disabled={edit}
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange("mobile")}
                                    onBlur={formik.handleBlur("mobile")}
                                />
                                <div className="errors fail-message mt-2">
                                    {formik.touched.mobile && formik.errors.mobile}
                                </div>
                            </div>
                            {edit ? (
                                <Link onClick={() => setEdit(false)} className="button border-0 mt-2">
                                    <span>Edit Profile</span>
                                </Link>
                            ) : (
                                <div className="d-flex gap-2 mt-4">
                                    <button type="submit" className="button border-0">
                                        Confirm
                                    </button>
                                    <button
                                        type="button"
                                        className="button signup border-0"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Profile;