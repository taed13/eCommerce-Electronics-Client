import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/user/userSlice";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";
import $ from "jquery";

const profileSchema = yup.object({
    name: yup.string().required("Không được để trống tên tài khoản"),
    email: yup.string().email("Địa chỉ email không hợp lệ").required("Không được để trống địa chỉ email"),
    addresses: yup.array().of(
        yup.object().shape({
            firstname: yup.string().required("Không được để trống tên"),
            lastname: yup.string().required("Không được để trống họ"),
            mobileNo: yup.string().required("Không được để trống số điện thoại")
                .matches(
                    /^[0-9]{10}$/,
                    "Số điện thoại không hợp lệ, vui lòng nhập đúng 10 số"
                ),
            province: yup.object().shape({
                id: yup.string().required("Chưa chọn tỉnh/thành phố"),
                name: yup.string().required("Chưa chọn tỉnh/thành phố"),
            }),
            district: yup.object().shape({
                id: yup.string().required("Chưa chọn quận/huyện"),
                full_name: yup.string().required("Chưa chọn quận/huyện"),
            }),
            ward: yup.object().shape({
                id: yup.string().required("Chưa chọn phường/xã"),
                full_name: yup.string().required("Chưa chọn phường/xã"),
            }),
            street: yup.string().required("Không được để trống số nhà, tên đường"),
        })
    ),
});

const Profile = () => {
    const dispatch = useDispatch();
    const userInfoState = useSelector((state) => state.auth?.userInfo);
    const [edit, setEdit] = useState(true);
    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        addresses: [
            {
                firstname: "",
                lastname: "",
                mobileNo: "",
                province: { id: "", name: "" },
                district: { id: "", full_name: "" },
                ward: { id: "", full_name: "" },
                street: "",
            },
        ],
    });
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(initialValues.addresses[0].province.id);
    const [selectedDistrict, setSelectedDistrict] = useState(initialValues.addresses[0].district.id);
    const [selectedWard, setSelectedWard] = useState(initialValues.addresses[0].ward.id);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: profileSchema,
        onSubmit: (values) => {
            const updatedValues = {
                ...values,
                addresses: [
                    {
                        firstname: values.addresses[0].firstname,
                        lastname: values.addresses[0].lastname,
                        mobileNo: values.addresses[0].mobileNo,
                        province: values.addresses[0].province,
                        district: values.addresses[0].district,
                        ward: values.addresses[0].ward,
                        street: values.addresses[0].street,
                        default: true,
                    },
                ],
            };
            dispatch(updateProfile(updatedValues));
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

    useEffect(() => {
        $.getJSON("https://esgoo.net/api-tinhthanh/1/0.htm")
            .then((response) => {
                if (response.error === 0) {
                    setProvinces(response.data);
                } else {
                    console.error("Error fetching provinces:", response.message);
                }
            })
            .then(() => {
                if (selectedProvince) {
                    return $.getJSON(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`);
                }
            })
            .then((response) => {
                if (response && response.error === 0) {
                    setDistricts(response.data);
                    setWards([]);
                } else if (response) {
                    console.error("Error fetching districts:", response.message);
                }
            })
            .then(() => {
                if (selectedDistrict) {
                    return $.getJSON(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`);
                }
            })
            .then((response) => {
                if (response && response.error === 0) {
                    setWards(response.data);
                } else if (response) {
                    console.error("Error fetching wards:", response.message);
                }
            })
            .catch((error) => {
                console.error("Error in fetching data:", error);
            });
    }, [selectedProvince, selectedDistrict]);

    useEffect(() => {
        setInitialValues({
            name: userInfoState?.name || "",
            email: userInfoState?.email || "",
            addresses: [
                {
                    firstname: userInfoState?.addresses?.[0]?.firstname || "",
                    lastname: userInfoState?.addresses?.[0]?.lastname || "",
                    mobileNo: userInfoState?.addresses?.[0]?.mobileNo || "",
                    province: userInfoState?.addresses?.[0]?.province || { id: "", name: "" },
                    district: userInfoState?.addresses?.[0]?.district || { id: "", full_name: "" },
                    ward: userInfoState?.addresses?.[0]?.ward || { id: "", full_name: "" },
                    street: userInfoState?.addresses?.[0]?.street || "",
                },
            ],
        });
        setSelectedProvince(userInfoState?.addresses?.[0]?.province?.id || "");
        setSelectedDistrict(userInfoState?.addresses?.[0]?.district?.id || "");
        setSelectedWard(userInfoState?.addresses?.[0]?.ward?.id || "");
    }, [userInfoState]);

    return (
        <>
            <Meta title="Tài khoản của tôi" />
            <BreadCrumb title="Tài khoản của tôi" />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-start">
                            {edit ? (
                                <h3 className="mb-4">Tài khoản của tôi</h3>
                            ) : (
                                <h3 className="mb-4">Chỉnh sửa tài khoản</h3>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <form onSubmit={formik.handleSubmit}>
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
                            <div className="p-4 border border-1 rounded-3" style={{marginTop: "30px"}}>
                                <h5 className="mb-3 fw-bold">Thông tin địa chỉ giao hàng</h5>
                                <div className="d-flex col-12 mb-2">
                                    <div className="col-6" style={{ paddingRight: "20px" }}>
                                        <label htmlFor="firstname" className="form-label">
                                            Tên
                                        </label>
                                        <input
                                            type="text"
                                            name="addresses[0].firstname"
                                            className="form-control"
                                            id="firstname"
                                            disabled={edit}
                                            value={formik.values.addresses[0].firstname}
                                            onChange={formik.handleChange("addresses[0].firstname")}
                                            onBlur={formik.handleBlur("addresses[0].firstname")}
                                        />
                                        <div className="errors fail-message mt-2">
                                            {formik.touched.addresses?.[0]?.firstname && formik.errors.addresses?.[0]?.firstname}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="lastname" className="form-label">
                                            Họ
                                        </label>
                                        <input
                                            type="text"
                                            name="addresses[0].lastname"
                                            className="form-control"
                                            id="lastname"
                                            disabled={edit}
                                            value={formik.values.addresses[0].lastname}
                                            onChange={formik.handleChange("addresses[0].lastname")}
                                            onBlur={formik.handleBlur("addresses[0].lastname")}
                                        />
                                        <div className="errors fail-message mt-2">
                                            {formik.touched.addresses?.[0]?.lastname && formik.errors.addresses?.[0]?.lastname}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mobileNo" className="form-label">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="text"
                                        name="addresses[0].mobileNo"
                                        className="form-control"
                                        id="mobileNo"
                                        disabled={edit}
                                        value={formik.values.addresses[0].mobileNo}
                                        onChange={formik.handleChange("addresses[0].mobileNo")}
                                        onBlur={formik.handleBlur("addresses[0].mobileNo")}
                                    />
                                    <div className="errors fail-message mt-2">
                                        {formik.touched.addresses?.[0]?.mobileNo && formik.errors.addresses?.[0]?.mobileNo}
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label">
                                        Địa chỉ giao hàng
                                    </label>
                                    <div className="d-flex gap-3 w-100">
                                        <div className="mb-3 w-100">
                                            <select
                                                name="addresses[0].province.name"
                                                className="form-control form-select"
                                                value={formik.values.addresses[0].province.id}
                                                disabled={edit}
                                                onChange={(e) => {
                                                    const selectedProvince = provinces.find(
                                                        (province) => province.id === e.target.value
                                                    );
                                                    formik.setFieldValue("addresses[0].province", selectedProvince);
                                                    setSelectedProvince(selectedProvince.id);
                                                }}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="" disabled>Chọn Tỉnh/Thành</option>
                                                {provinces.map((province) => (
                                                    <option key={province.id} value={province.id}>
                                                        {province.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="error fail-message mt-1">
                                                {formik.touched.addresses?.[0]?.province?.id && formik.errors.addresses?.[0]?.province?.id}
                                            </div>
                                        </div>
                                        <div className="mb-3 w-100">
                                            <select
                                                name="addresses[0].district.full_name"
                                                className="form-control form-select"
                                                value={formik.values.addresses[0].district.id}
                                                onChange={(e) => {
                                                    const selectedDistrict = districts.find(
                                                        (district) => district.id === e.target.value
                                                    );
                                                    formik.setFieldValue("addresses[0].district", selectedDistrict);
                                                    setSelectedDistrict(selectedDistrict.id);
                                                }}
                                                onBlur={formik.handleBlur}
                                                disabled={!selectedProvince || edit}
                                            >
                                                <option value="" disabled>
                                                    Chọn Quận/Huyện
                                                </option>
                                                {districts.map((district) => (
                                                    <option key={district.id} value={district.id}>
                                                        {district.full_name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="error fail-message mt-1">
                                                {formik.touched.addresses?.[0]?.district?.id && formik.errors.addresses?.[0]?.district?.id}
                                            </div>
                                        </div>
                                        <div className="mb-3 w-100">
                                            <select
                                                name="addresses[0].ward.full_name"
                                                className="form-control form-select"
                                                value={formik.values.addresses[0].ward.id}
                                                onChange={(e) => {
                                                    const selectedWard = wards.find(
                                                        (ward) => ward.id === e.target.value
                                                    );
                                                    formik.setFieldValue("addresses[0].ward", selectedWard);
                                                    setSelectedWard(selectedWard.id);
                                                }}
                                                onBlur={formik.handleBlur}
                                                disabled={!selectedDistrict || edit}
                                            >
                                                <option value="" disabled>
                                                    Chọn Phường/Xã
                                                </option>
                                                {wards.map((ward) => (
                                                    <option key={ward.id} value={ward.id}>
                                                        {ward.full_name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="error fail-message mt-1">
                                                {formik.touched.addresses?.[0]?.ward?.id && formik.errors.addresses?.[0]?.ward?.id}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input
                                        type="text"
                                        placeholder="Số nhà, tên đường"
                                        className="form-control"
                                        name="addresses[0].street"
                                        value={formik.values.addresses[0].street}
                                        disabled={edit}
                                        onChange={formik.handleChange("addresses[0].street")}
                                        onBlur={formik.handleBlur("addresses[0].street")}
                                    />
                                    <div className="error fail-message mt-1">
                                        {formik.touched.addresses?.[0]?.street && formik.errors.addresses?.[0]?.street}
                                    </div>
                                </div>
                            </div>
                            {edit ? (
                                <div className="d-flex align-items-center gap-2">
                                    <Link onClick={() => setEdit(false)} className="button border-0 mt-2">
                                        <span>Chỉnh sửa tài khoản</span>
                                    </Link>
                                    <Link
                                        onClick={() => {
                                            handleLogout();
                                        }}
                                        className="button border-0 mt-2">
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
                        </form>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Profile;