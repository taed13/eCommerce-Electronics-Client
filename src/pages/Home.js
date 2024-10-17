import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "../utils/Data";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { getAllProducts } from "../features/products/productSlice";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import wish from "../images/wish.svg";
import prodcompare from "../images/prodcompare.svg";
import { addToWishlist } from "../features/products/productSlice";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";

const Home = () => {
    const blogState = useSelector((state) => state?.blog?.blog);
    const productState = useSelector((state) => state?.product?.product);
    const navigate = useNavigate();
    let location = useLocation();

    const dispatch = useDispatch();
    useEffect(() => {
        getBlogs();
        getProducts();
    }, []);
    const getBlogs = () => {
        dispatch(getAllBlogs());
    };
    const getProducts = () => {
        dispatch(getAllProducts());
    };

    const addToWish = (prodId) => {
        dispatch(addToWishlist(prodId));
    };
    console.log(blogState);
    console.log(productState);
    return (
        <>
            <Container class1="home-wrapper-1 py-5">
                <div className="row">
                    <div className="col-6">
                        <div className="main-banner position-relative">
                            <img
                                src="images/main-banner-1.jpg"
                                className="img-fluid rounded-3"
                                alt="main-banner"
                            />
                            <div className="main-banner-content position-absolute">
                                <h4>SUPERCHARGED FOR PROS.</h4>
                                <h5>iPad S13+ Pro.</h5>
                                <p>From $990.00 or $41.62/mo.</p>
                                <Link className="button">BUY NOW</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                            <div className="small-banner position-relative">
                                <img
                                    src="images/catbanner-01.jpg"
                                    className="img-fluid rounded-3"
                                    alt="cat-banner-1"
                                />
                                <div className="small-banner-content position-absolute">
                                    <h4>BEST SALE</h4>
                                    <h5>Laptops Max</h5>
                                    <p>
                                        From $1699.00 <br /> or $64.62/mo.
                                    </p>
                                </div>
                            </div>
                            <div className="small-banner position-relative">
                                <img
                                    src="images/catbanner-02.jpg"
                                    className="img-fluid rounded-3"
                                    alt="cat-banner-1"
                                />
                                <div className="small-banner-content position-absolute">
                                    <h4>NEW ARRIVAL</h4>
                                    <h5>Buy iPad Air</h5>
                                    <p>
                                        From $599.00 <br /> or $49.91/mo. for 12 mo. *
                                    </p>
                                </div>
                            </div>
                            <div className="small-banner position-relative">
                                <img
                                    src="images/catbanner-03.jpg"
                                    className="img-fluid rounded-3"
                                    alt="cat-banner-1"
                                />
                                <div className="small-banner-content position-absolute">
                                    <h4>NEW ARRIVAL</h4>
                                    <h5>Buy iPad Air</h5>
                                    <p>
                                        From $599.00 <br /> or $49.91/mo. for 12 mo. *
                                    </p>
                                </div>
                            </div>
                            <div className="small-banner position-relative">
                                <img
                                    src="images/catbanner-04.jpg"
                                    className="img-fluid rounded-3"
                                    alt="cat-banner-1"
                                />
                                <div className="small-banner-content position-absolute">
                                    <h4>NEW ARRIVAL</h4>
                                    <h5>Buy iPad Air</h5>
                                    <p>
                                        From $599.00 <br /> or $49.91/mo. for 12 mo. *
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="services d-flex align-items-center justify-content-between">
                            {services?.map((service, index) => {
                                return (
                                    <div className="d-flex align-items-center gap-15" key={index}>
                                        <img src={service.image} alt="services" />
                                        <div>
                                            <h6 className="fw-bold">{service.title}</h6>
                                            <p className="mb-0">{service.tagline}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="home-wrapper-2 py-3">
                <div className="row">
                    <div className="col-12">
                        <div className="categories d-flex flex-wrap justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <div className="">
                                    <h6 className="fw-bold">Camaras</h6>
                                    <p>10 items</p>
                                </div>
                                <img src="images/camera.jpg" alt="camera" />
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="">
                                    <h6 className="fw-bold">Smart TV</h6>
                                    <p>10 items</p>
                                </div>
                                <img src="images/tv.jpg" alt="camera" />
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="">
                                    <h6 className="fw-bold">Headphone</h6>
                                    <p>10 items</p>
                                </div>
                                <img src="images/headphone.jpg" alt="camera" />
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="">
                                    <h6 className="fw-bold">Music $ Games</h6>
                                    <p>10 items</p>
                                </div>
                                <img src="images/camera.jpg" alt="camera" />
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="">
                                    <h6 className="fw-bold">Camaras</h6>
                                    <p>10 items</p>
                                </div>
                                <img src="images/camera.jpg" alt="camera" />
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="">
                                    <h6 className="fw-bold">Smart TV</h6>
                                    <p>10 items</p>
                                </div>
                                <img src="images/tv.jpg" alt="camera" />
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="">
                                    <h6 className="fw-bold">Headphone</h6>
                                    <p>10 items</p>
                                </div>
                                <img src="images/headphone.jpg" alt="camera" />
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="">
                                    <h6 className="fw-bold">Music $ Games</h6>
                                    <p>10 items</p>
                                </div>
                                <img src="images/camera.jpg" alt="camera" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="featured-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Feature collections</h3>
                    </div>
                    {productState &&
                        productState?.map((item, index) => {
                            if (item?.tags?.includes("featured")) {
                                return (
                                    <div key={index} className={"col-3"}>
                                        <div
                                            className="product-card position-relative"
                                        >
                                            <div className="wishlist-icon position-absolute">
                                                <button
                                                    className="border-0 bg-transparent"
                                                    onClick={() => addToWish(item?._id)}
                                                >
                                                    <img src={wish} alt="wishlist" />
                                                </button>
                                            </div>
                                            <div className="product-image">
                                                <img
                                                    src={item?.images[0]}
                                                    className="img-fluid mx-auto"
                                                    alt="product"
                                                    width={160}
                                                />
                                                <img
                                                    src={item?.images[0]}
                                                    className="img-fluid mx-auto"
                                                    alt="product"
                                                    width={160}
                                                />
                                            </div>
                                            <div className="product-details">
                                                <h6 className="brand">{item?.brand}</h6>
                                                <h5 className="product-title">{item?.title}</h5>
                                                <ReactStars
                                                    count={5}
                                                    size={24}
                                                    value={+item?.totalRating}
                                                    edit={false}
                                                    activeColor="#ffd700"
                                                />

                                                <p className="price">$ {item?.price}</p>
                                            </div>
                                            <div className="action-bar position-absolute">
                                                <div className="d-flex flex-column gap-15">
                                                    <button className="border-0 bg-transparent">
                                                        <img src={prodcompare} alt="prodcompare" />
                                                    </button>
                                                    <button className="border-0 bg-transparent">
                                                        <IoEyeOutline onClick={() => navigate("/product/" + item?._id)} className="product-card-icons" />
                                                    </button>
                                                    <button className="border-0 bg-transparent">
                                                        <IoCartOutline className="product-card-icons" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                </div>
            </Container>

            <Container class1="famous-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img
                                src="images/famous-01.webp"
                                className="img-fluid"
                                alt="famous"
                            />
                            <div className="famous-content position-absolute">
                                <h5>big screen</h5>
                                <h6>Smart Watch Series 7</h6>
                                <p>From $399 or $16.62/mo. for 24 mo.*</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img
                                src="images/famous-02.webp"
                                className="img-fluid"
                                alt="famous"
                            />
                            <div className="famous-content position-absolute">
                                <h5 className="text-dark">studio display</h5>
                                <h6 className="text-dark">600 nits of brightness.</h6>
                                <p className="text-dark">27-inch 5K Retina display</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img
                                src="images/famous-03.webp"
                                className="img-fluid"
                                alt="famous"
                            />
                            <div className="famous-content position-absolute">
                                <h5 className="text-dark">smartphones</h5>
                                <h6 className="text-dark">Iphone 13 Pro.</h6>
                                <p className="text-dark">
                                    Now in Green. From $990.00 or $41.62/mo. for 24mo.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img
                                src="images/famous-04.webp"
                                className="img-fluid"
                                alt="famous"
                            />
                            <div className="famous-content position-absolute">
                                <h5 className="text-dark">home speakers</h5>
                                <h6 className="text-dark">Room-filling sounds.</h6>
                                <p className="text-dark">From $699 or $116.58/mo. for 12mo.*</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="special-wrapper py-4 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Special Products</h3>
                    </div>
                </div>
                <div className="row">
                    {productState &&
                        productState?.map((item, index) => {
                            if (item?.tags?.includes("special")) {
                                return (
                                    <SpecialProduct
                                        key={index}
                                        id={item?._id}
                                        title={item?.title}
                                        brand={item?.brand}
                                        totalRating={item?.totalRating.toString()}
                                        price={item?.price}
                                        sold={item?.sold}
                                        quantity={item?.quantity}
                                    />
                                );
                            }
                            return null;
                        })}
                </div>
            </Container>
            <Container class1="popular-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Our popular products</h3>
                    </div>
                </div>
                <div className="row">
                    {productState &&
                        productState?.map((item, index) => {
                            if (item?.tags?.includes("popular")) {
                                return (
                                    <div key={index} className={"col-3"}>
                                        <div
                                            className="product-card position-relative"
                                        >
                                            <div className="wishlist-icon position-absolute">
                                                <button
                                                    className="border-0 bg-transparent"
                                                    onClick={() => addToWish(item?._id)}
                                                >
                                                    <img src={wish} alt="wishlist" />
                                                </button>
                                            </div>
                                            <div className="product-image">
                                                <img
                                                    src={item?.images[0]}
                                                    className="img-fluid mx-auto"
                                                    alt="product"
                                                    width={160}
                                                />
                                                <img
                                                    src={item?.images[0]}
                                                    className="img-fluid mx-auto"
                                                    alt="product"
                                                    width={160}
                                                />
                                            </div>
                                            <div className="product-details">
                                                <h6 className="brand">{item?.brand}</h6>
                                                <h5 className="product-title">{item?.title}</h5>
                                                <ReactStars
                                                    count={5}
                                                    size={24}
                                                    value={+item?.totalRating}
                                                    edit={false}
                                                    activeColor="#ffd700"
                                                />

                                                <p className="price">$ {item?.price}</p>
                                            </div>
                                            <div className="action-bar position-absolute">
                                                <div className="d-flex flex-column gap-15">
                                                    <button className="border-0 bg-transparent">
                                                        <img src={prodcompare} alt="prodcompare" />
                                                    </button>
                                                    <button className="border-0 bg-transparent">
                                                        <IoEyeOutline onClick={() => navigate("/product/" + item?._id)} className="product-card-icons" />
                                                    </button>
                                                    <button className="border-0 bg-transparent">
                                                        <IoCartOutline className="product-card-icons" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                </div>
            </Container>
            <Container class1="marque-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="marquee-inner-wrapper card-wrapper">
                            <Marquee className="d-flex gap-30">
                                <div className="mx-4 w-25">
                                    <img src="images/brand-01.png" alt="brand" />
                                </div>
                                <div className="mx-4 w-25">
                                    <img src="images/brand-02.png" alt="brand" />
                                </div>
                                <div className="mx-4 w-25">
                                    <img src="images/brand-03.png" alt="brand" />
                                </div>
                                <div className="mx-4 w-25">
                                    <img src="images/brand-04.png" alt="brand" />
                                </div>
                                <div className="mx-4 w-25">
                                    <img src="images/brand-05.png" alt="brand" />
                                </div>
                                <div className="mx-4 w-25">
                                    <img src="images/brand-06.png" alt="brand" />
                                </div>
                                <div className="mx-4 w-25">
                                    <img src="images/brand-07.png" alt="brand" />
                                </div>
                                <div className="mx-4 w-25">
                                    <img src="images/brand-08.png" alt="brand" />
                                </div>
                            </Marquee>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="blog-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Our Latest Blogs</h3>
                    </div>
                    <div className="row">
                        {blogState &&
                            blogState.data?.map((item, index) => {
                                if (index < 4) {
                                    return (
                                        <div className="col-3" key={index}>
                                            <BlogCard
                                                id={item?.id}
                                                title={item?.title}
                                                description={item?.description}
                                                image={item?.image[0]?.url}
                                                date={moment(item?.createdAt).format(
                                                    "MMMM DD YYYY, H:mm a"
                                                )}
                                            />
                                        </div>
                                    );
                                }
                                return null;
                            })}
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Home;
