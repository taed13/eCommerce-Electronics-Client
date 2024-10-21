import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/user/userSlice";
import { FiEdit } from "react-icons/fi";

const profileSchema = yup.object({
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    mobile: yup.string().required("Mobile is required"),
});

const Profile = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.auth.user);
    const [edit, setEdit] = useState(true);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: userState?.firstname || "",
            lastname: userState?.lastname || "",
            email: userState?.email || "",
            mobile: userState?.mobile || "",
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            console.log(values);
            dispatch(updateProfile(values));
            setEdit(true);
        },
    });

    return (
        <>
            <BreadCrumb title="My Orders" />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="my-3">Update Profile</h3>
                            <FiEdit className="fs-3" size={20} onClick={() => setEdit(false)} />
                        </div>
                    </div>
                    <div className="col-12">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="firstname" className="form-label">
                                    First Name
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
                                <div className="errors">
                                    {formik.touched.firstname && formik.errors.firstname}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastname" className="form-label">
                                    Last Name
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
                                <div className="errors">
                                    {formik.touched.lastname && formik.errors.lastname}
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
                                <div className="errors">
                                    {formik.touched.email && formik.errors.email}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mobile" className="form-label">
                                    Mobile No
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
                                <div className="errors">
                                    {formik.touched.mobile && formik.errors.mobile}
                                </div>
                            </div>
                            {
                                edit
                                ||
                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-primary">
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => setEdit(true)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Profile;
