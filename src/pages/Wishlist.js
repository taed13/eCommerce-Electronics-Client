import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishList } from "../features/user/userSlice";
import { addToWishlist } from "../features/products/productSlice";
import { NoRecordFound } from "../components/404/NoRecordFound/index";

const Wishlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getWishlistFromDb();
    }, []);

    const getWishlistFromDb = () => {
        dispatch(getUserProductWishList());
    };

    const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishList);

    console.log(wishlistState);
    const removeFromWislist = (id) => {
        dispatch(addToWishlist(id));

        setTimeout(() => {
            dispatch(getUserProductWishList());
        }, 300);
    };
    return (
        <>
            <Meta title={"Wishlist"} />
            <BreadCrumb title="Wishlist" />
            <Container class1="wishlist-wrapper home-wrapper-2 py-5">
                <div className="row">
                    {wishlistState && wishlistState?.length === 0 && <NoRecordFound />}
                    {wishlistState &&
                        wishlistState?.map((item, index) => {
                            return (
                                <div className="wishlist-card-cover col-3" key={index}>
                                    <div className="wishlist-card position-relative">
                                        <img
                                            onClick={() => removeFromWislist(item?._id)}
                                            src="images/cross.svg"
                                            alt="cross"
                                            className="position-absolute cross img-fluid"
                                        />

                                        <div className="wishlist-card-image bg-white">
                                            <img
                                                src={
                                                    item?.images[0].url
                                                        ? item?.images[0].url
                                                        : "images/watch.jpg"
                                                }
                                                className="img-fluid d-block mx-auto"
                                                alt="watch"
                                                width={160}
                                            />
                                        </div>
                                        <div className="px-3 py-3">
                                            <h6 className="brand">{item?.brand}</h6>
                                            <h5 className="title">{item?.title}</h5>
                                            <h6 className="price">$ {item?.price}</h6>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </Container>
        </>
    );
};

export default Wishlist;
