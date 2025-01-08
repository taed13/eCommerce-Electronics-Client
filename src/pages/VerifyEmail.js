import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmailService } from "../api/user.api";
import Meta from "../components/Meta";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Đang xác minh email...");
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await verifyEmailService(token);
                if (response.data) {
                    setMessage("Xác minh email thành công! Đang trở lại trang đăng nhập...");
                    const interval = setInterval(() => {
                        setCountdown((prev) => prev - 1);
                    }, 1000);

                    setTimeout(() => {
                        clearInterval(interval);
                        navigate("/login");
                    }, 3000);
                }
            } catch (error) {
                setMessage("Liên kết xác minh không hợp lệ hoặc đã hết hạn.");
            }
        };

        if (token) {
            verifyEmail();
        }
    }, [token, navigate]);

    return (
        <>
            <Meta title="Electronics | Xác minh Email" />
            <div className="verify-wrapper py-5 text-center">
                <h3>{message}</h3>
                {countdown > 0 && (
                    <p className="text-muted">
                        Đang chuyển hướng trong <strong>{countdown}</strong> giây...
                    </p>
                )}
            </div>
        </>
    );
};

export default VerifyEmail;