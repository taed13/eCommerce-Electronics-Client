import React from "react";
import { Modal, Button } from "react-bootstrap";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";


const ConfirmDisableModal = ({ show, handleClose, handleConfirm }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận vô hiệu hóa tài khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc chắn muốn vô hiệu hóa tài khoản này không? Hành động này không thể hoàn tác.
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    className="button signup border-0 d-flex align-items-center gap-1"
                    onClick={handleClose}
                >
                    <IoChevronBackOutline className="fs-5" />
                    Quay lại
                </Button>
                <Button type="button" className="button border-0 d-flex align-items-center gap-2"
                    onClick={handleConfirm}
                >
                    <IoMdCheckmark className="fs-5" />
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDisableModal;