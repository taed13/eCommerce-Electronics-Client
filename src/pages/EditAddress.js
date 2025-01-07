import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import $ from "jquery";
import { FaSave } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { updateAddressService } from "../api/user.api";
import { toast } from "react-toastify";
// import { updateAddress } from "../features/user/userSlice";

const addressSchema = yup.object({
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
});

const EditAddress = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const addressesState = useSelector((state) => state.auth?.userInfo?.addresses);
    const [address, setAddress] = useState(null);
    const addressId = location.pathname.split("/").pop();
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");

    useEffect(() => {
        if (addressesState?.length > 0) {
            const foundAddress = addressesState.find((addr) => addr._id === addressId);
            setAddress(foundAddress);
            if (foundAddress) {
                setSelectedProvince(foundAddress.province.id);
                setSelectedDistrict(foundAddress.district.id);
                setSelectedWard(foundAddress.ward.id);
            }
        }
    }, [addressesState, addressId]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: address?.firstname || "",
            lastname: address?.lastname || "",
            mobileNo: address?.mobileNo || "",
            province: address?.province || { id: "", name: "" },
            district: address?.district || { id: "", full_name: "" },
            ward: address?.ward || { id: "", full_name: "" },
            street: address?.street || "",
        },
        validationSchema: addressSchema,
        onSubmit: async (values) => {
            const { data, error } = await updateAddressService(addressId, values);
            if (data) {
                toast.success("Địa chỉ đã được thêm thành công!");
                formik.resetForm();
                navigate('/my-profile');
            } else {
                toast.error(error);
            }
        },
    });

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

    const handleBack = () => {
        formik.resetForm();
        window.history.back();
    }

    return (
        <>
            <Meta title="Electronics | Sửa địa chỉ" />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-9">
                        <div className="d-flex justify-content-between align-items-start">
                            <h3 className="mb-0">Sửa địa chỉ giao hàng</h3>
                        </div>
                    </div>
                    <div className="col-9">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="p-4 border border-1 rounded-3" style={{ marginTop: "30px" }}>
                                <div className="d-flex col-12 mb-2">
                                    <div className="col-6" style={{ paddingRight: "20px" }}>
                                        <label htmlFor="lastname" className="form-label">
                                            Họ
                                        </label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            className="form-control"
                                            id="lastname"
                                            placeholder="Nhập họ"
                                            value={formik.values.lastname}
                                            onChange={formik.handleChange("lastname")}
                                            onBlur={formik.handleBlur("lastname")}
                                        />
                                        <div className="errors fail-message mt-2">
                                            {formik.touched.lastname && formik.errors.lastname}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="firstname" className="form-label">
                                            Tên
                                        </label>
                                        <input
                                            type="text"
                                            name="firstname"
                                            className="form-control"
                                            id="firstname"
                                            placeholder="Nhập tên"
                                            value={formik.values.firstname}
                                            onChange={formik.handleChange("firstname")}
                                            onBlur={formik.handleBlur("firstname")}
                                        />
                                        <div className="errors fail-message mt-2">
                                            {formik.touched.firstname && formik.errors.firstname}
                                        </div>
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
                                        placeholder="Nhập số điện thoại"
                                        value={formik.values.mobileNo}
                                        onChange={formik.handleChange("mobileNo")}
                                        onBlur={formik.handleBlur("mobileNo")}
                                    />
                                    <div className="errors fail-message mt-2">
                                        {formik.touched.mobileNo && formik.errors.mobileNo}
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label">
                                        Địa chỉ giao hàng
                                    </label>
                                    <div className="d-flex gap-3 w-100">
                                        <div className="mb-3 w-100">
                                            <select
                                                name="province.id"
                                                className="form-control form-select"
                                                value={formik.values.province.id}
                                                onChange={(e) => {
                                                    const selectedProvince = provinces.find(
                                                        (province) => province.id === e.target.value
                                                    );
                                                    formik.setFieldValue("province", selectedProvince); // Cập nhật tỉnh/thành phố
                                                    setSelectedProvince(selectedProvince.id);
                                                    // Xóa giá trị các trường liên quan
                                                    formik.setFieldValue("district", { id: "", full_name: "" });
                                                    formik.setFieldValue("ward", { id: "", full_name: "" });
                                                    setSelectedDistrict(""); // Xóa quận/huyện
                                                    setSelectedWard(""); // Xóa phường/xã
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
                                                {formik.touched.province?.id && formik.errors.province?.id}
                                            </div>
                                        </div>
                                        <div className="mb-3 w-100">
                                            <select
                                                name="district.id"
                                                className="form-control form-select"
                                                value={formik.values.district.id}
                                                onChange={(e) => {
                                                    const selectedDistrict = districts.find(
                                                        (district) => district.id === e.target.value
                                                    );
                                                    formik.setFieldValue("district", selectedDistrict); // Cập nhật quận/huyện
                                                    setSelectedDistrict(selectedDistrict.id);
                                                    // Xóa giá trị phường/xã
                                                    formik.setFieldValue("ward", { id: "", full_name: "" });
                                                    setSelectedWard(""); // Xóa phường/xã
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
                                                {formik.touched.district?.id && formik.errors.district?.id}
                                            </div>
                                        </div>
                                        <div className="mb-3 w-100">
                                            <select
                                                name="ward.id"
                                                className="form-control form-select"
                                                value={formik.values.ward.id}
                                                onChange={(e) => {
                                                    const selectedWard = wards.find(
                                                        (ward) => ward.id === e.target.value
                                                    );
                                                    formik.setFieldValue("ward", selectedWard); // Cập nhật phường/xã
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
                                                {formik.touched.ward?.id && formik.errors.ward?.id}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input
                                        type="text"
                                        placeholder="Nhập số nhà, tên đường"
                                        className="form-control"
                                        name="street"
                                        value={formik.values.street}
                                        onChange={formik.handleChange("street")}
                                        onBlur={formik.handleBlur("street")}
                                    />
                                    <div className="error fail-message mt-1">
                                        {formik.touched.street && formik.errors.street}
                                    </div>
                                </div>
                                <div className="d-flex gap-2 mt-4">
                                    <button type="button" className="button signup border-0 d-flex align-items-center gap-1" onClick={() => handleBack()}>
                                        <IoChevronBackOutline className="fs-5" />
                                        Quay lại
                                    </button>
                                    <button type="submit" className="button border-0 d-flex align-items-center gap-1">
                                        <FaSave />
                                        Lưu địa chỉ
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default EditAddress;