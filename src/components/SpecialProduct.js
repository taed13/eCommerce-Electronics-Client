import React from "react";
import { Link } from "react-router-dom";
import Rating from 'react-rating';
import { FaStar, FaRegStar } from "react-icons/fa";
import "../styles/special-product.css";

const SpecialProduct = (props) => {
    const { id, title, img, brand, totalRating, price, sold, quantity, discount } = props;

    // Tính toán giá hiển thị và văn bản giảm giá
    let displayPrice = price;
    let discountText = "";

    if (discount) {
        if (discount.discount_type === "percentage") {
            displayPrice = price - (price * discount.discount_value / 100);
            discountText = `-${discount.discount_value}%`;
        } else if (discount.discount_type === "fixed_amount") {
            displayPrice = price - discount.discount_value;
            discountText = `-${discount.discount_value.toLocaleString()}₫`;
        }
    }

    return (
        <div className="col-6 mb-3">
            <div className="special-product-card position-relative">
                {/* Hiển thị badge giảm giá nếu có */}
                {discountText && (
                    <div className="discount-badge position-absolute top-0 start-0 bg-danger text-white p-1 rounded">
                        {discountText}
                    </div>
                )}
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center justify-content-center">
                        <img src={img} className="img-fluid" width={250} height={250} alt="product" />
                    </div>
                    <div className="special-product-content w-75">
                        <h5 className="brand">{brand}</h5>
                        <h6 className="title text-truncate">{title}</h6>
                        <Rating
                            className="mb-2"
                            initialRating={Number(totalRating)}
                            readonly
                            emptySymbol={<FaRegStar className="fs-5" style={{ color: '#f59e0b' }} />}
                            fullSymbol={<FaStar className="fs-5" style={{ color: '#f59e0b' }} />}
                        />
                        <p className="price">
                            <span className="red-p">{displayPrice.toLocaleString()}₫</span> &nbsp;
                            {discount && <strike>{price.toLocaleString()}₫</strike>}
                        </p>
                        <div className="prod-count my-3">
                            <p>Chỉ còn <b>{quantity}</b> sản phẩm</p>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                        width: `${(quantity / (quantity + sold)) * 100}%`,
                                    }}
                                    aria-valuenow={(quantity / (quantity + sold)) * 100}
                                    aria-valuemin={quantity}
                                    aria-valuemax={sold + quantity}
                                ></div>
                            </div>
                        </div>
                        <Link className="button" to={"/product/" + id} onClick={() => window.scrollTo(0, 0)}>
                            Chi tiết
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialProduct;
