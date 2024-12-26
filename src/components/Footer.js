import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsTwitterX, BsInstagram } from "react-icons/bs";
import newsletter from "../images/newsletter.png";
import { FaChevronUp } from "react-icons/fa";

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            <footer className="py-4">
                <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="col-5">
                            <div className="footer-top-data d-flex gap-30 align-items-center">
                                <img src={newsletter} alt="newsletter" />
                                <h3 className="mb-0 text-white">Đăng ký nhận thông tin mới nhất</h3>
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control py-1"
                                    placeholder="Địa chỉ email của bạn"
                                    aria-label="Your Email Address"
                                    aria-describedby="basic-addon2"
                                />
                                <span className="input-group-text py-2 px-3" id="basic-addon2">
                                    Đăng ký
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className="py-3">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-4">
                            <h4 className="text-white mb-4">Liên hệ chúng tôi</h4>
                            <div className="">
                                <address className="text-white fs-6">
                                    12 Hàm Nghi, <br /> Đà Nẵng, Việt Nam <br />
                                    PinCode: 120302
                                </address>
                                <a
                                    href="tel: +84 989 112 223"
                                    className="mt-3 d-block mb-1 text-white"
                                >
                                    +84 989 112 223
                                </a>
                                <a
                                    href="mailto: tancuynh@gmail.com"
                                    className="mt-3 d-block mb-0 text-white"
                                >
                                    support@electronics.com
                                </a>
                            </div>
                            <div className="social_icons d-flex align-items-center gap-30 mt-4">
                                <a className="text-white" href="#">
                                    <BsFacebook className="fs-4" />
                                </a>
                                <a className="text-white" href="#">
                                    <BsGithub className="fs-4" />
                                </a>
                                <a className="text-white" href="#">
                                    <BsTwitterX className="fs-4" />
                                </a>
                                <a className="text-white" href="#">
                                    <BsInstagram className="fs-4" />
                                </a>
                            </div>
                        </div>
                        <div className="col-3">
                            <h4 className="text-white mb-4">Thông tin</h4>
                            <div className="footer-link d-flex flex-column ">
                                <Link to="privacy-policy" className="text-white py-2 mb-1" onClick={() => window.scrollTo(0, 0)}>
                                    Chính sách bảo mật
                                </Link>
                                <Link to="refund-policy" className="text-white py-2 mb-1" onClick={() => window.scrollTo(0, 0)}>
                                    Chính sách hoàn trả
                                </Link>
                                <Link to="shipping-policy" className="text-white py-2 mb-1" onClick={() => window.scrollTo(0, 0)}>
                                    Chính sách vận chuyển
                                </Link>
                                <Link to="term-and-condition" className="text-white py-2 mb-1" onClick={() => window.scrollTo(0, 0)}>
                                    Điều khoản và điều kiện
                                </Link>
                                <Link to="blogs" className="text-white py-2 mb-1" onClick={() => window.scrollTo(0, 0)}>
                                    Blog
                                </Link>
                            </div>
                        </div>
                        <div className="col-3">
                            <h4 className="text-white mb-4">Tài khoản</h4>
                            <div className="footer-link d-flex flex-column ">
                                <Link className="text-white py-2 mb-1">Về chúng tôi</Link>
                                <Link className="text-white py-2 mb-1">FAQ</Link>
                                <Link className="text-white py-2 mb-1" to="/contact" onClick={() => window.scrollTo(0, 0)}>Liên hệ</Link>
                            </div>
                        </div>
                        <div className="col-2">
                            <h4 className="text-white mb-4">Đường dẫn</h4>
                            <div className="footer-link d-flex flex-column ">
                                <Link className="text-white py-2 mb-1">Laptops</Link>
                                <Link className="text-white py-2 mb-1">Tai nghe</Link>
                                <Link className="text-white py-2 mb-1">Máy tính bảng</Link>
                                <Link className="text-white py-2 mb-1">Đồng hồ</Link>
                            </div>
                        </div>
                        {isVisible && (
                            <div className="to-top-btn" onClick={scrollToTop}>
                                <FaChevronUp />
                            </div>
                        )}
                    </div>
                </div>
            </footer>
            <footer className="py-4">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <p className="text-center mb-0 text-white">
                                &copy;{new Date().getFullYear()}; Powered by Cristiano Ronaldo
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;