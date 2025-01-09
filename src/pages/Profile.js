import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Meta from "../components/Meta";
import { FaPlus, FaUserEdit } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { TbPasswordUser } from "react-icons/tb";
import ChangePassword from "../components/ChangePassword";
import { getUserInfoById, updateProfile } from "../features/user/userSlice"; // Import fetchUserInfo action
import { deleteAddressService, setDefaultAddressService } from "../api/user.api";
import { toast } from "react-toastify";

const profileSchema = yup.object({
    name: yup.string().required("Không được để trống tên tài khoản"),
    email: yup.string().email("Địa chỉ email không hợp lệ")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Địa chỉ email không hợp lệ"
        )
        .required("Không được để trống địa chỉ email"),
});

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const userInfoState = useSelector((state) => state.auth?.userInfo);
    const [edit, setEdit] = useState(true);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        setAddresses(userInfoState?.addresses);
    }, [userInfoState]);

    useEffect(() => {
        dispatch(getUserInfoById(userInfoState?._id));
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: userInfoState?.name || "",
            email: userInfoState?.email || "",
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            console.log("Updated values:", values);
            dispatch(updateProfile(values));
            setEdit(true);
        },
    });

    useEffect(() => {
        if (!edit) {
            formik.setTouched({});
        }
    }, [edit]);

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    const handleCancel = () => {
        formik.resetForm();
        setEdit(true);
    };

    const onSetDefaultAddress = async (addressId) => {
        const { data, error } = await setDefaultAddressService(addressId);
        if (data) {
            console.log("Default address updated successfully!");
            toast.success("Đã đặt địa chỉ mặc định thành công!");
            dispatch(getUserInfoById(userInfoState?._id));
        } else {
            console.error(error);
        }
    };

    const onDeleteAddressService = async (addressId) => {
        const { data, error } = await deleteAddressService(addressId);
        if (data) {
            console.log("Address deleted successfully!");
            toast.success("Đã xóa địa chỉ thành công!");
            dispatch(getUserInfoById(userInfoState?._id));
        } else {
            console.error(error);
        }
    }

    return (
        <>
            <Meta title="Electronics | Tài khoản của tôi" />
            <BreadCrumb title="Tài khoản của tôi" />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-start">
                            <h3 className="mb-0">Tài khoản của tôi</h3>
                        </div>
                    </div>
                    <div className="col-12">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="p-4 border border-1 rounded-3 bg-white" style={{ marginTop: "30px" }}>
                                <h5 className="mb-3 fw-bold">{edit ? "Thông tin tài khoản" : "Chỉnh sửa thông tin tài khoản"}</h5>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Tên tài khoản
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        id="name"
                                        disabled={edit}
                                        value={formik.values.name}
                                        onChange={formik.handleChange("name")}
                                        onBlur={formik.handleBlur("name")}
                                    />
                                    <div className="errors fail-message mt-2">
                                        {formik.touched.name && formik.errors.name}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Địa chỉ email
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
                                {edit ? (
                                    <div className="d-flex align-items-center gap-2 mt-2">
                                        <Link onClick={() => setEdit(false)} className="button border-0 mt-2 d-flex align-items-center gap-2">
                                            <FaUserEdit className="fs-5" />
                                            <span>Chỉnh sửa tài khoản</span>
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => setShowChangePassword(true)}
                                            className="button border-0 mt-2 d-flex align-items-center gap-2"
                                        >
                                            <TbPasswordUser className="fs-5" />
                                            <span>Đổi mật khẩu</span>
                                        </button>
                                        <Link
                                            onClick={() => {
                                                handleLogout();
                                            }}
                                            className="button border-0 mt-2 d-flex align-items-center gap-2 logout-button"
                                        >
                                            <IoLogOut className="fs-5" />
                                            <span>Đăng xuất</span>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="d-flex gap-2 mt-4">
                                        <button type="submit" className="button border-0">
                                            Xác nhận
                                        </button>
                                        <button
                                            type="button"
                                            className="button signup border-0"
                                            onClick={handleCancel}
                                        >
                                            Quay lại
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>
                        <ChangePassword show={showChangePassword} handleClose={() => setShowChangePassword(false)} />
                        <div className="col-12">
                            <div className="d-flex justify-content-between align-items-start">
                                <h3 className="mt-5 mb-0">Địa chỉ của tôi</h3>
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <div className="add-address-item" onClick={() => { navigate('/addAddress'); window.scrollTo(0, 0); }}>
                                        <FaPlus className="add-address-item-icon" />
                                        <span className="add-address-item-span">Thêm địa chỉ mới</span>
                                    </div>
                                </div>
                                {addresses?.map((address, index) => (
                                    <div key={index} className="col-md-4 mb-3">
                                        <div className="address-item position-relative">
                                            <div className="d-flex flex-column justify-content-between align-items-start">
                                                <span className="address-item-span fw-bold">{address.lastname} {address.firstname}</span>
                                                <span className="address-item-span">{address.street}</span>
                                                <span className="address-item-span">{address.ward.full_name}</span>
                                                <span className="address-item-span">{address.district.full_name}</span>
                                                <span className="address-item-span">{address.province.name}</span>
                                                <span className="address-item-span">Số điện thoại: {address.mobileNo}</span>
                                            </div>
                                            {address.default && (
                                                <div className="address-item-default">
                                                    <span>Địa chỉ mặc định</span>
                                                </div>
                                            )}
                                            <div className="d-flex justify-content-start align-items-center gap-4">
                                                <Link className="address-item-actions" to={`/editAddress/${address._id}`} onClick={() => { window.scrollTo(0, 0) }}>Sửa</Link>
                                                {!address.default && (
                                                    <>
                                                        <button className="address-item-actions" onClick={() => onDeleteAddressService(address._id)}>
                                                            Xóa
                                                        </button>
                                                        <button className="address-item-actions" onClick={() => onSetDefaultAddress(address._id)}>
                                                            Đặt làm mặc định
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container >
        </>
    );
};

export default Profile;