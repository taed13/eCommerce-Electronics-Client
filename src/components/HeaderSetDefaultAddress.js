import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setDefaultAddressService } from "../api/user.api";
import { toast } from "react-toastify";
import { getUserInfoById } from "../features/user/userSlice";

const ChangeAddressModal = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const userInfoState = useSelector((state) => state.auth?.userInfo);
    const addresses = useSelector((state) => state?.auth?.userInfo?.addresses);

    const onSetDefaultAddress = async (addressId) => {
        const { data, error } = await setDefaultAddressService(addressId);
        if (data) {
            console.log("Default address updated successfully!");
            toast.success("Đã đặt địa chỉ mặc định thành công!");
            dispatch(getUserInfoById(userInfoState?._id));
            handleClose();
        } else {
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} className="d-flex align-items-center justify-content-center">
            <Modal.Header closeButton>
                <Modal.Title className="fs-5 fw-bold">Chọn địa chỉ giao hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column">
                    <span className="header-address-caution-span">Tùy chọn giao hàng và tốc độ giao hàng có thể khác nhau tùy theo địa điểm</span>
                    {addresses?.slice(0, 4)?.map((address) => (
                        <div key={address._id} onClick={() => onSetDefaultAddress(address._id)} className={`header-address-item ${address.default ? "header-default-address" : ""}`}>
                            <div className="p-2 d-flex flex-column ">
                                <div className="d-flex align-items-baseline gap-2">
                                    <span className="header-address-item-bold-span">{address.lastname} {address.firstname}</span>
                                    <span className="header-address-item-span">{address.street}</span>
                                </div>
                                <span className="header-address-item-span">{address.ward.full_name}, {address.district.full_name}, {address.province.name}</span>
                                <span className="header-address-item-span">{address.mobileNo}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ChangeAddressModal;