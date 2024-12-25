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
    addresses: yup.object().shape({
        mobileNo: yup.string().required("Không được để trống số điện thoại")
            .matches(
                /^[0-9]{10}$/,
                "Số điện thoại không hợp lệ, vui lòng nhập đúng 10 số"
            ),
        province: yup.string().required("Chưa chọn tỉnh/thành phố"),
        district: yup.string().required("Chưa chọn quận/huyện"),
        ward: yup.string().required("Chưa chọn phường/xã"),
        street: yup.string().required("Không được để trống địa chỉ"),
    })
});

const Profile = () => {
    const dispatch = useDispatch();
    const userInfoState = useSelector((state) => state.auth?.userInfo);
    const [edit, setEdit] = useState(true);
    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        addresses: {
            mobileNo: "",
            province: "",
            district: "",
            ward: "",
            street: "",
        },});
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(initialValues.addresses.province);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: profileSchema,
        onSubmit: (values) => {
            const updatedValues = {
                ...values,
                addresses: [
                    {
                        mobileNo: values.addresses.mobileNo,
                        province: values.addresses.province,
                        district: values.addresses.district,
                        ward: values.addresses.ward,
                        street: values.addresses.street,
                    },
                ],
            };
            dispatch(updateProfile(updatedValues));
            setEdit(true);
        },
    });

    console.log('formik:::', formik);

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
        $.getJSON("https://esgoo.net/api-tinhthanh/1/0.htm", (response) => {
            if (response.error === 0) {
                setProvinces(response.data);
            } else {
                console.error("Error fetching provinces:", response.message);
            }
        });
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            $.getJSON(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`, (response) => {
                if (response.error === 0) {
                    setDistricts(response.data);
                    setWards([]);
                } else {
                    console.error("Error fetching districts:", response.message);
                }
            });
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            $.getJSON(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`, (response) => {
                if (response.error === 0) {
                    setWards(response.data);
                } else {
                    console.error("Error fetching wards:", response.message);
                }
            });
        }
    }, [selectedDistrict]);

    useEffect(() => {
        setInitialValues({
            name: userInfoState?.name || "",
            email: userInfoState?.email || userInfoState?.email || "",
            addresses: {
                mobileNo: userInfoState?.addresses?.[0]?.mobileNo || "",
                province: userInfoState?.addresses?.[0]?.province?.name || "",
                district: userInfoState?.addresses?.[0]?.district?.name || "",
                ward: userInfoState?.addresses?.[0]?.ward?.name || "",
                street: userInfoState?.addresses?.[0]?.street || "",
            },
        });
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
                            <div className="mb-3">
                                <label htmlFor="mobileNo" className="form-label">
                                    Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    name="mobileNo"
                                    className="form-control"
                                    id="mobileNo"
                                    disabled={edit}
                                    value={formik.values.addresses.mobileNo}
                                    onChange={formik.handleChange("addresses.mobileNo")}
                                    onBlur={formik.handleBlur("addresses.mobileNo")}
                                />
                                <div className="errors fail-message mt-2">
                                    {formik.touched.addresses?.mobileNo && formik.errors.addresses?.mobileNo}
                                </div>
                            </div>
                            <div>
                                <label className="form-label">
                                    Địa chỉ giao hàng
                                </label>
                                <div className="d-flex gap-3 w-100">
                                    <div className="mb-3 w-100">
                                        <select
                                            name="addresses.province"
                                            className="form-control form-select"
                                            value={formik.values.addresses.province}
                                            disabled={edit}
                                            onChange={(e) => {
                                                const selectedProvince = provinces.find(
                                                    (province) => province.name === e.target.value
                                                );
                                                formik.setFieldValue("addresses.province", selectedProvince.name);
                                                setSelectedProvince(selectedProvince.id);
                                            }}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option value="" disabled>Chọn Tỉnh/Thành</option>
                                            {provinces.map((province) => (
                                                <option key={province.id} value={province.name}>
                                                    {province.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="error fail-message mt-1">
                                            {formik.touched.addresses?.province && formik.errors.addresses?.province}
                                        </div>
                                    </div>
                                    <div className="mb-3 w-100">
                                        <select
                                            name="addresses.district"
                                            className="form-control form-select"
                                            value={formik.values.addresses.district}
                                            onChange={(e) => {
                                                const selectedDistrict = districts.find(
                                                    (district) => district.id === e.target.value
                                                );
                                                formik.setFieldValue("addresses.district", selectedDistrict.full_name);
                                                setSelectedDistrict(selectedDistrict.id);
                                            }}
                                            onBlur={formik.handleBlur}
                                            disabled={!selectedProvince}
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
                                            {formik.touched.addresses?.district && formik.errors.addresses?.district}
                                        </div>
                                    </div>
                                    <div className="mb-3 w-100">
                                        <select
                                            name="addresses.ward"
                                            className="form-control form-select"
                                            value={formik.values.addresses.ward}
                                            onChange={(e) => {
                                                const selectedWard = wards.find(
                                                    (ward) => ward.id === e.target.value
                                                );
                                                formik.setFieldValue("addresses.ward", selectedWard.full_name);
                                                setSelectedWard(selectedWard.id);
                                            }}
                                            onBlur={formik.handleBlur}
                                            disabled={!selectedDistrict}
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
                                            {formik.touched.addresses?.ward && formik.errors.addresses?.ward}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-100">
                                <input
                                    type="text"
                                    placeholder="Số nhà, tên đường"
                                    className="form-control"
                                    name="addresses.street"
                                    value={formik.values.addresses.street}
                                    disabled={edit}
                                    onChange={formik.handleChange("addresses.street")}
                                    onBlur={formik.handleBlur("addresses.street")}
                                />
                                <div className="error fail-message mt-1">
                                    {formik.touched.addresses?.street && formik.errors.addresses?.street}
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