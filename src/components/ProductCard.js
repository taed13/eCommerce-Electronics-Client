import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import wish from "../images/wish.svg";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";
import Rating from 'react-rating';
import { FaStar, FaRegStar } from "react-icons/fa";
import SoldOut from "../assets/sold-out-png-4.png";
import "../styles/product-card.css"; // CSS

const ProductCard = (props) => {
    const { grid, data } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();
    const addToWish = (prodId) => {
        dispatch(addToWishlist(prodId));
    };

    const getPlainText = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
    };

    return (
        <>
            {data && data?.map((item, index) => {
                const plainTextDescription = getPlainText(item?.product_description);
                const truncatedDescription = plainTextDescription.length > 120
                    ? plainTextDescription.substring(0, 120) + "..."
                    : plainTextDescription;

                // Tính giá trị giảm giá để hiển thị
                let discountText = "";
                if (item?.discount) {
                    if (item.discount.discount_type === "percentage") {
                        discountText = `-${item.discount.discount_value}%`;
                    } else if (item.discount.discount_type === "fixed_amount") {
                        discountText = `-${item.discount.discount_value.toLocaleString()}₫`;
                    }
                }

                return (
                    <div
                        key={index}
                        className={`${location.pathname === "/product" ? `gr-${grid}` : "col-3"} pointer-cursor`}
                        onClick={() => {
                            navigate("/product/" + item?._id);
                            window.scrollTo(0, 0);
                        }}
                    >
                        <div className={`product-card position-relative ${item?.product_quantity === 0 ? "sold-out" : ""}`}>
                            {/* Lớp phủ khi sản phẩm hết hàng */}
                            {item?.product_quantity === 0 && (
                                <div className="sold-out-overlay">
                                    <img
                                        src={SoldOut}
                                        alt="Sold Out"
                                        className="sold-out-image"
                                    />
                                </div>
                            )}
                            {/* Hiển thị discount */}
                            {discountText && (
                                <div className="discount-badge">
                                    {discountText}
                                </div>
                            )}
                            <div className="wishlist-icon position-absolute">
                                <button className="border-0 bg-transparent" onClick={() => addToWish(item?._id)}>
                                    <img src={wish} alt="wishlist" />
                                </button>
                            </div>
                            <div className={`product-image d-flex ${grid === 12 && "w-25"}`} style={{ height: "200px" }}>
                                <img
                                    src={item?.product_images[0]?.url}
                                    className="img-fluid mx-auto"
                                    alt="product image"
                                    width={160}
                                />
                                <img
                                    src={item?.product_images[1]?.url}
                                    className="img-fluid mx-auto"
                                    alt="product image"
                                    width={160}
                                />
                            </div>
                            <div className={`product-details ${grid === 12 && "w-75"}`}>
                                <h6 className="brand">{item?.product_brand[0]?.title}</h6>
                                <h5 className="product-title text-truncate">{item?.product_name}</h5>
                                <div className="d-flex align-items-center justify-content-between gap-10 rating">
                                    <Rating
                                        initialRating={+item?.product_totalRating}
                                        readonly
                                        emptySymbol={<FaRegStar className="fs-6" style={{ color: '#f59e0b' }} />}
                                        fullSymbol={<FaStar className="fs-6" style={{ color: '#f59e0b' }} />}
                                    />
                                    {item?.product_sold !== 0 && <span className="sold">Đã bán {item?.product_sold}</span>}
                                </div>
                                <div className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
                                    {truncatedDescription}
                                </div>
                                <div className="d-flex align-items-center gap-10">
                                    {item?.discount ? (
                                        <>
                                            <p className="price text-danger fw-bold">
                                                {item?.product_after_price?.toLocaleString()}₫
                                            </p>
                                            <p className="original-price text-muted text-decoration-line-through">
                                                {item?.product_price?.toLocaleString()}₫
                                            </p>
                                        </>
                                    ) : (
                                        <p className="price text-dark fw-bold">
                                            {item?.product_price?.toLocaleString()}₫
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ProductCard;
