import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import wishlist from "../images/wishlist.svg";
import { MdContactSupport } from "react-icons/md";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../features/products/productSlice";
import { getInfoByEmailAddress, getUserCart, getUserInfoById } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { IoLocationOutline } from "react-icons/io5";
import ChangeAddressModal from "./HeaderSetDefaultAddress";
import EaLogo from "../images/EA_logo_Electronic_Arts.png";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = Boolean(localStorage.getItem("token"));

    const cartState = useSelector((state) => state?.auth?.cartProducts);
    const userState = useSelector((state) => state?.auth?.user?.findUser);
    const productState = useSelector((state) => state?.product?.product);
    const authState = useSelector((state) => state?.auth);

    const [productOtp, setProductOtp] = useState([]);
    const [total, setTotal] = useState(0);
    const [paginate, setPaginate] = useState(true);
    const [isFixed, setIsFixed] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false); // State to manage modal visibility
    const token = localStorage.getItem("token");

    useEffect(() => {
        dispatch(getUserCart());
    }, [dispatch]);

    useEffect(() => {
        // Decode token and fetch user info
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split(".")[1]));
                dispatch(getInfoByEmailAddress(decoded.email));
                dispatch(getUserInfoById(decoded.id));
            } catch (error) {
                console.error("Token decoding error:", error);
            }
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (authState?.userInfo?.user) {
            let infoUser = authState?.userInfo?.user;
            let result = Object.keys(infoUser).map((key) => [key, infoUser[key], token]);
            result.push(["token", token]);
            let newResult = Object.fromEntries(result);
            const finalResult = JSON.stringify(newResult);
            localStorage.setItem("customer", finalResult);
        }
    }, [authState?.userInfo?.user]);

    useEffect(() => {
        if (cartState?.data?.cart_products?.length > 0) {
            const sum = cartState.data.cart_products.reduce(
                (acc, item) => acc + (item.price * item.quantity || 0),
                0
            );
            setTotal(sum);
        } else {
            setTotal(0);
        }
    }, [cartState]);

    useEffect(() => {
        if (token && !cartState?.length) {
            dispatch(getUserCart());
        }
    }, [dispatch, token]);

    useEffect(() => {
        let data = [];
        for (let i = 0; i < productState?.length; i++) {
            const element = productState[i];
            data.push({ id: i, prod: element?._id, name: element?.product_name });
        }

        setProductOtp(data);
    }, [productState]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 90) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleCartClick = (e) => {
        if (!cartState?.data?.cart_count_product || cartState?.data?.cart_count_product === 0) {
            e.preventDefault();
            toast.error("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước!");
        } else {
            navigate("/cart");
        }
    };

    let defaultAddress = null;
    if (authState && authState?.userInfo?.addresses) {
        defaultAddress = authState?.updatedUser
            ? authState?.updatedUser?.updatedUser?.addresses.find(address => address.default === true)
            : authState?.userInfo?.addresses.find(address => address.default === true);
    }

    return (
        <>
            <header className={`header-upper py-3 ${isFixed ? "fixed" : ""}`}>
                <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="col-2 d-flex align-items-end">
                            <span className="">
                                <Link to="/" className="text-white d-flex align-items-center gap-2 fs-4" onClick={() => { navigate("/"); window.scrollTo(0, 0); }}>
                                <img src={EaLogo} width={30} height={30} alt="" />
                                    Electronics
                                </Link>
                            </span>
                        </div>
                        <div className="col-1" style={{ paddingLeft: '0px' }}>
                            {
                                defaultAddress && (
                                    <div
                                        className="text-white d-flex align-items-center justify-content-start pointer-cursor"
                                        onClick={() => setShowAddressModal(true)} // Open modal on click
                                    >
                                        <span>
                                            <IoLocationOutline className="fs-3" />
                                        </span>
                                        <div className="d-flex flex-column">
                                            <small className="lh-1" style={{ fontSize: '11px' }}>Giao hàng tại</small>
                                            <span className="text-truncate" style={{ maxWidth: '90px', fontSize: '15px' }}>{defaultAddress.province.name}</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="col-6 d-flex align-items-start justify-content-start">
                            <div className="input-group">
                                <Typeahead
                                    id="pagination-typeahead"
                                    onPaginate={() => setPaginate(true)}
                                    onChange={(selected) => {
                                        if (selected.length) {
                                            navigate(`/product/${selected[0]?.prod}`);
                                            dispatch(getAProduct(selected[0]?.prod));
                                        }
                                    }}
                                    options={productOtp}
                                    paginate={paginate}
                                    labelKey={(option) => `${option.name}`}
                                    minLength={1}
                                    placeholder="Tìm kiếm sản phẩm..."
                                />
                                <span className="input-group-text p-3" id="basic-addon2">
                                    <BsSearch className="fs-6" />
                                </span>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="header-upper-links d-flex align-items-center justify-content-between">
                                <div>
                                    <Link
                                        to={(authState?.user !== null || authState?.userInfo !== null) ? "/my-profile" : "/login"}
                                        className="d-flex align-items-center gap-1 text-white"
                                    >
                                        <img src={user} alt="user" />
                                        {
                                            authState?.user === null ? (
                                                <p className="mb-0">
                                                    {
                                                        authState?.userInfo
                                                            ? authState?.userInfo?.user?.name
                                                            : "Đăng nhập"
                                                    }
                                                </p>
                                            ) : (
                                                authState?.updatedUser ? (
                                                    <p className="mb-0">
                                                        {authState?.updatedUser?.updatedUser?.name}
                                                    </p>
                                                ) : (
                                                    <p className="mb-0">
                                                        {
                                                            authState?.user?.name ?
                                                                (authState?.user?.name) : (
                                                                    authState?.userInfo?.user?.name
                                                                )
                                                        }
                                                    </p>
                                                )
                                            )
                                        }
                                    </Link>
                                </div>
                                <div>
                                    <a href="#" onClick={handleCartClick} className="d-flex align-items-center gap-10 text-white">
                                        <img src={cart} alt="cart" />
                                        <div className="d-flex flex-column">
                                            <span className="badge bg-white text-dark">
                                                {cartState?.data?.cart_count_product || 0}
                                            </span>
                                            <p className="mb-0">{(total == null ? 0 : total).toLocaleString()}₫</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <header className={`header-bottom py-3 ${isFixed ? "fixed" : ""}`}>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="menu-bottom d-flex align-items-center gap-30">
                                <div className="">
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex align-items-center gap-15 header-dropdownmenu-button"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <img src={menu} alt="menu" />
                                            <span className="me-5 d-inline-block">
                                                Danh mục
                                            </span>
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                        >
                                            {(authState?.user !== null || isAuthenticated) && (
                                                <>
                                                    <Link className="dropdown-item text-white" to="/my-orders">
                                                        Đơn hàng của tôi
                                                    </Link>
                                                </>
                                            )}
                                            {(authState?.user !== null || isAuthenticated) && (
                                                <>
                                                    <Link className="dropdown-item text-white" to="/chat">
                                                        Electronics Talks
                                                    </Link>
                                                </>
                                            )}
                                            <li>
                                                <Link className="dropdown-item text-white" to="/blogs">
                                                    Blogs
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between w-100">
                                    <div className="menu-links">
                                        <div className="d-flex align-items-center gap-15 text-white">
                                            <NavLink className="header-navlinks" to="/">
                                                Trang chủ
                                            </NavLink>
                                            |
                                            <NavLink className="header-navlinks" to="/product">
                                                Cửa hàng
                                            </NavLink>
                                            |
                                            <NavLink className="header-navlinks" to="/blogs">
                                                Blogs
                                            </NavLink>
                                        </div>
                                    </div>
                                    <div className="menu-links">
                                        <NavLink className="header-navlinks" to="/contact">
                                            <MdContactSupport className="fs-2" />
                                            Liên hệ chúng tôi
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <ChangeAddressModal show={showAddressModal} handleClose={() => setShowAddressModal(false)} /> {/* Render the modal */}
        </>
    );
};

export default Header;