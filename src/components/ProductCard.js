import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import wish from "../images/wish.svg";
import prodcompare from "../images/prodcompare.svg";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";

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
            {
                data && data?.map((item, index) => {

                    const plainTextDescription = getPlainText(item?.product_description);
                    const truncatedDescription = plainTextDescription.length > 120
                        ? plainTextDescription.substring(0, 120) + "..."
                        : plainTextDescription;

                    return (
                        <div key={index} className={`${location.pathname === "/product" ? `gr-${grid}` : "col-3"} pointer-cursor`} onClick={() => { navigate("/product/" + item?._id); window.scrollTo(0, 0); }}>
                            <div className="product-card position-relative">
                                <div className="wishlist-icon position-absolute">
                                    <button className="border-0 bg-transparent" onClick={() => addToWish(item?._id)}>
                                        <img src={wish} alt="wishlist" />
                                    </button>
                                </div>
                                <div className={`product-image d-flex ${grid === 12 && "w-25"}`}>
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
                                    <h5 className="product-title text-truncate">
                                        {item?.product_name}
                                    </h5>
                                    <div className="d-flex align-items-center justify-content-between gap-10">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={+item?.product_totalRating}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        {item?.product_sold !== 0 && <span className="sold">Đã bán {item?.product_sold}</span>}
                                    </div>
                                    <div className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
                                        {truncatedDescription}
                                    </div>
                                    <p className="price">{item?.product_price.toLocaleString()}₫</p>
                                </div>
                                {/* <div className="action-bar position-absolute">
                                    <div className="d-flex flex-column gap-15">
                                        <button className="border-0 bg-transparent">
                                        <img src={prodcompare} alt="prodcompare" />
                                    </button>
                                        <Link to={'/product/' + item?._id} onClick={() => window.scrollTo(0, 0)} className="border-0 bg-transparent">
                                            <IoEyeOutline className="product-card-icons" />
                                        </Link>
                                        <button className="border-0 bg-transparent">
                                            <IoCartOutline className="product-card-icons" />
                                        </button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    );
                })}
        </>
    );
};

export default ProductCard;