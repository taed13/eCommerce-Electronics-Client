import React from "react";
import { Link } from "react-router-dom";
import Rating from 'react-rating';
import { FaStar, FaRegStar } from "react-icons/fa";

const SpecialProduct = (props) => {
    const { id, title, img, brand, totalRating, price, sold, quantity } = props;
    return (
        <div className="col-6 mb-3">
            <div className="special-product-card">
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center justify-content-center">
                        <img src={img} className="img-fluid" width={250} height={250} alt="watch" />
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
                            <span className="red-p">{price.toLocaleString()}₫</span> &nbsp;{" "}
                            <strike>{(price * 2).toLocaleString()}₫</strike>
                        </p>
                        {/* <div className="discount-till d-flex align-items-center gap-10">
                            <p className="mb-0">
                                <b>5</b> days
                            </p>
                            <div className="d-flex gap-10 align-items-center">
                                <span className="time-stamp badge rounded-circle bg-danger">
                                    1
                                </span>
                                :
                                <span className="time-stamp badge rounded-circle bg-danger">
                                    1
                                </span>
                                :
                                <span className="time-stamp badge rounded-circle bg-danger">
                                    1
                                </span>
                            </div>
                        </div> */}
                        <div className="prod-count my-3">
                            <p>
                                Chỉ còn <b>{quantity - sold}</b> sản phẩm
                            </p>
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
                        <Link className="button" to={"/product/" + id} onClick={() => (window.scrollTo(0, 0))}>
                            Chi tiết
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialProduct;
