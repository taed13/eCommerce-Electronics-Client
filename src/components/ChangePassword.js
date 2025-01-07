import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../features/user/userSlice";

const passwordSchema = yup.object({
    oldPassword: yup.string().required("Không được để trống mật khẩu cũ"),
    newPassword: yup.string().required("Không được để trống mật khẩu mới").min(8, "Mật khẩu mới phải có ít nhất 8 ký tự"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'Mật khẩu xác nhận không khớp')
        .required("Không được để trống mật khẩu xác nhận"),
});

const ChangePassword = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.auth);

    const handleChangePassword = async (values) => {
        const { oldPassword, newPassword } = values;
        const resultAction = dispatch(changePassword({ currentPassword: oldPassword, newPassword }));

        if (changePassword.fulfilled.match(resultAction)) {
            console.log("Mật khẩu đã được đổi thành công");
            formik.resetForm();
            handleClose();
        } else {
            console.log("Lỗi:", resultAction.payload);
        }
    };

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: passwordSchema,
        onSubmit: (values) => {
            handleChangePassword(values);
        },
    });

    useEffect(() => {
        if (state.isSuccess) {
            formik.resetForm();
            handleClose();
        }
    }, [state]);

    const handleCancel = () => {
        formik.resetForm();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} className="d-flex align-items-center justify-content-center">
            <Modal.Header closeButton>
                <Modal.Title className="fs-5 fw-bold">Đổi mật khẩu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="oldPassword" className="form-label">
                            Mật khẩu cũ
                        </label>
                        <input
                            type="password"
                            name="oldPassword"
                            className="form-control"
                            id="oldPassword"
                            placeholder="••••••••"
                            value={formik.values.oldPassword}
                            onChange={formik.handleChange("oldPassword")}
                            onBlur={formik.handleBlur("oldPassword")}
                        />
                        <div className="errors fail-message mt-2">
                            {formik.touched.oldPassword && formik.errors.oldPassword}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">
                            Mật khẩu mới
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            className="form-control"
                            id="newPassword"
                            placeholder="••••••••"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange("newPassword")}
                            onBlur={formik.handleBlur("newPassword")}
                        />
                        <div className="errors fail-message mt-2">
                            {formik.touched.newPassword && formik.errors.newPassword}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                            Xác nhận lại mật khẩu mới
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="••••••••"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange("confirmPassword")}
                            onBlur={formik.handleBlur("confirmPassword")}
                        />
                        <div className="errors fail-message mt-2">
                            {formik.touched.confirmPassword && formik.errors.confirmPassword}
                        </div>
                    </div>
                    <div className="d-flex gap-2 mt-4">
                        <Button type="submit" className="button border-0">
                            Xác nhận
                        </Button>
                        <Button
                            type="button"
                            className="button signup border-0"
                            onClick={handleCancel}
                        >
                            Quay lại
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ChangePassword;