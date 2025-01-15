import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "../utils/Data";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { getAllProducts } from "../features/products/productSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import Meta from "../components/Meta";
import Rating from 'react-rating';
import { FaStar, FaRegStar } from "react-icons/fa";
import { getLatestProductsService, getPopularProductsService, getSpecialProductsService } from "../api/product.api";
import "../styles/home.css";
import { getAllBannersService } from "../api/banner.api";

const Home = () => {
    const blogState = useSelector((state) => state?.blog?.blog);
    const productState = useSelector((state) => state?.product?.product);
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        setLoading(true);
        const { data, error } = await getAllBannersService();
        if (error) {
            console.error(error);
        } else {
            setBanners(data);
        }
        setLoading(false);
    };

    const getBannerClass = (index) => {
        switch (index) {
            case 0:
                return 'blue-bg';
            case 1:
                return 'green-bg';
            case 2:
                return 'beige-bg';
            case 3:
                return 'pink-bg';
            default:
                return '';
        }
    };

    const [popularProducts, setPopularProducts] = useState([]);
    const [specialProducts, setSpecialProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        getBlogs();
        getProducts();
        fetchPopularProducts();
        fetchSpecialProducts();
        fetchLatestProducts();
    }, []);
    const getBlogs = () => {
        dispatch(getAllBlogs({}));
    };
    const getProducts = () => {
        dispatch(getAllProducts());
    };

    const [prodCategoryCount, setProdCategoryCount] = useState([]);

    useEffect(() => {
        const categoryCount = {};

        productState && productState.forEach((product) => {
            const category = product.product_category[0].title;
            if (categoryCount[category]) {
                categoryCount[category]++;
            } else {
                categoryCount[category] = 1;
            }
        });

        const categoryCountArray = Object.keys(categoryCount).map((category) => ({
            category: category,
            count: categoryCount[category],
        }));

        setProdCategoryCount(categoryCountArray);
    }, [productState]);

    const handleCategoryClick = (categoryQuery) => {
        dispatch(getAllProducts({ category: categoryQuery, sort: "manual" }));
        navigate(`/product?product_category=${categoryQuery}&sort=manual`);
    };

    const fetchPopularProducts = async () => {
        const { data, error } = await getPopularProductsService();
        if (error) {
            console.error("Error fetching popular products:", error);
        } else {
            setPopularProducts(data?.popularProducts);
        }
    };

    const fetchSpecialProducts = async () => {
        const result = await getSpecialProductsService();
        if (result.error) {
            console.error("Error fetching special products:", result.error);
        } else {
            setSpecialProducts(result.data);
        }
    };

    const fetchLatestProducts = async () => {
        const { data, error } = await getLatestProductsService();
        if (error) {
            console.error("Error fetching lastest products:", error);
        } else {
            setLatestProducts(data.products);
        }
    };

    return (
        <>
            <Meta title={"Electronics | Trang chủ"} />
            <Container class1="home-wrapper-1 pt-5 pb-4">
                <div className="row g-4">
                    {banners[0] && (
                        <div className="col-12 col-lg-6 banner-product-card-cover">
                            <div className="banner-product-card banner-main-product position-relative">
                                <div className="content-wrapper">
                                    <p className="banner-highlight-text">CÁC SẢN PHẨM NỔI BẬT NHẤT</p>
                                    <h2 className="banner-product-title">{banners[0].product.product_name}</h2>
                                    <p className="banner-product-desc">Giảm giá siêu sâu</p>
                                    <p className="banner-product-price">Nay chỉ còn <strong className='fs-5'>{banners[0].product.product_after_price.toLocaleString()}₫</strong></p>
                                    <button className="order-btn" onClick={() => { navigate("/product/" + banners[0].product._id); window.scrollTo(0, 0); }}>
                                        ĐẶT NGAY
                                    </button>
                                </div>
                                <div className="banner-placeholder-box main-banner">
                                    <img src={banners[0].product.product_images[0].url} height={300} width={300} className='img-fluid' alt="" />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="col-12 col-lg-6">
                        <div className="row g-4">
                            {banners.slice(1, 5).map((banner, index) => (
                                <div key={banner._id} className="col-12 col-md-6 pointer-cursor" onClick={() => { navigate("/product/" + banner.product._id); window.scrollTo(0, 0); }}>
                                    <div className={`banner-product-card banner-secondary-product ${getBannerClass(index)} position-relative`}>
                                        <span className="banner-tag">{banner.product.product_tags[0].name}</span>
                                        <h4 className="banner-product-title fw-bold">{banner.product.product_name}</h4>
                                        <p className="mb-0">Giá khuyến mãi còn</p>
                                        <p className='fw-bold'>{banner.product.product_after_price.toLocaleString()}₫</p>
                                        <div className="banner-placeholder-box small">
                                            <img src={banner.product.product_images[0].url} className='img-fluid' alt="" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="services d-flex align-items-center justify-content-between">
                            {services && services?.map((service, index) => {
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
                            {
                                prodCategoryCount.slice(0, 8).map((category, index) => {
                                    return (
                                        <div className="d-flex align-items-center pointer-cursor"
                                            onClick={() => {
                                                handleCategoryClick(category.category);
                                                window.scrollTo(0, 0);
                                            }}
                                            key={index}>
                                            <div className="">
                                                <h6 className="fw-bold">{category.category}</h6>
                                                <p>{category.count} items</p>
                                            </div>
                                            <div className="" style={{ width: "100px", height: "100px" }}>
                                                <img src={`images/${category.category.toLowerCase()}.png`} className="img-fluid" alt={category.category.toLowerCase()} />
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="featured-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Hàng mới về</h3>
                    </div>
                    {latestProducts &&
                        latestProducts
                            .slice(0, 4)
                            .map((item, index) => {
                                let displayPrice = item?.product_price;
                                let discountText = "";

                                if (item?.discount) {
                                    if (item.discount.discount_type === "percentage") {
                                        displayPrice = item.product_price - (item.product_price * item.discount.discount_value / 100);
                                        discountText = `-${item.discount.discount_value}%`;
                                    } else if (item.discount.discount_type === "fixed_amount") {
                                        displayPrice = item.product_price - item.discount.discount_value;
                                        discountText = `-${item.discount.discount_value.toLocaleString()}₫`;
                                    }
                                }

                                return (
                                    <div key={index} className={"col-3"}>
                                        <div
                                            className="product-card position-relative pointer-cursor"
                                            onClick={() => {
                                                navigate("/product/" + item?._id);
                                                window.scrollTo({ top: 0, behavior: "auto" });
                                            }}
                                        >
                                            {/* Hiển thị badge giảm giá nếu có */}
                                            {discountText && (
                                                <div className="discount-badge position-absolute">
                                                    {discountText}
                                                </div>
                                            )}
                                            <div className="product-image d-flex">
                                                <img
                                                    src={item?.product_images[0]?.url}
                                                    className="img-fluid mx-auto w-auto"
                                                    alt="product"
                                                />
                                                <img
                                                    src={item?.product_images[1]?.url || item?.product_images[0]?.url}
                                                    className="img-fluid mx-auto w-auto"
                                                    alt="product"
                                                />
                                            </div>
                                            <div className="product-details">
                                                <h6 className="brand">
                                                    {item?.product_brand?.map((brand, index) => (
                                                        <span key={brand._id}>
                                                            {brand.title}
                                                            {index < item.product_brand.length - 1 && " | "}
                                                        </span>
                                                    ))}
                                                </h6>
                                                <h5 className="product-title text-truncate">
                                                    {item?.product_name}
                                                </h5>
                                                <div className="d-flex align-items-center justify-content-between gap-10">
                                                    <Rating
                                                        className="mb-2"
                                                        initialRating={+item?.product_totalRating}
                                                        readonly
                                                        emptySymbol={
                                                            <FaRegStar className="fs-5" style={{ color: "#f59e0b" }} />
                                                        }
                                                        fullSymbol={
                                                            <FaStar className="fs-5" style={{ color: "#f59e0b" }} />
                                                        }
                                                    />
                                                    {item?.product_sold !== 0 && (
                                                        <span className="sold">Đã bán {item?.product_sold}</span>
                                                    )}
                                                </div>
                                                <div className="d-flex align-items-baseline gap-10">
                                                    <p className="price text-danger fw-bold">
                                                        {displayPrice.toLocaleString()}₫
                                                    </p>
                                                    {item?.discount && (
                                                        <p className="original-price text-muted text-decoration-line-through">
                                                            {item?.product_price?.toLocaleString()}₫
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                </div>
            </Container>
            <Container class1="famous-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-3 pointer-cursor" onClick={() => { navigate("/product/676bcabc3a7e698cd33561c7"); window.scrollTo(0, 0); }}>
                        <div className="famous-card position-relative">
                            <img
                                src="images/famous-01.webp"
                                className="img-fluid"
                                alt="famous"
                            />
                            <div className="famous-content position-absolute">
                                <h5>Màn hình rộng</h5>
                                <h6>Smart Watch Series 7</h6>
                                <p>Giá chỉ từ 4,790,000₫</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 pointer-cursor" onClick={() => { navigate("/product/676bee88f20dc5b91d7c2bad"); window.scrollTo(0, 0); }}>
                        <div className="famous-card position-relative">
                            <img
                                src="images/famous-02.webp"
                                className="img-fluid"
                                alt="famous"
                            />
                            <div className="famous-content position-absolute">
                                <h5 className="text-dark">studio display</h5>
                                <h6 className="text-dark">Độ sáng lên đến 600 nits.</h6>
                                <p className="text-dark">27-inch 5K Retina display</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 pointer-cursor" onClick={() => { navigate("/product/6742cfe1f8ee98c191f60bfc"); window.scrollTo(0, 0); }}>
                        <div className="famous-card position-relative">
                            <img
                                src="images/famous-03.webp"
                                className="img-fluid"
                                alt="famous"
                            />
                            <div className="famous-content position-absolute">
                                <h5 className="text-dark">smartphones</h5>
                                <h6 className="text-dark">Iphone 16 Pro.</h6>
                                <p className="text-dark">
                                    Giá chỉ từ 33,890,000₫
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 pointer-cursor" onClick={() => { navigate("/product/676bf1c1f20dc5b91d7c2d29"); window.scrollTo(0, 0); }}>
                        <div className="famous-card position-relative">
                            <img
                                src="images/famous-04.webp"
                                className="img-fluid"
                                alt="famous"
                            />
                            <div className="famous-content position-absolute">
                                <h5 className="text-dark">home speakers</h5>
                                <h6 className="text-dark">Room-filling sounds.</h6>
                                <p className="text-dark">Giá chỉ từ 3,990,000₫</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="special-wrapper py-4 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Sản phẩm đặc biệt</h3>
                    </div>
                </div>
                <div className="row">
                    {specialProducts &&
                        specialProducts.slice(0, 4).map((item, index) => (
                            <SpecialProduct
                                key={index}
                                id={item?._id}
                                title={item?.product_name}
                                img={item?.product_images[0]?.url}
                                brand={item?.product_brand[0]?.title}
                                totalRating={item?.product_totalRating?.toString()}
                                price={item?.product_price}
                                sold={item?.product_sold}
                                quantity={item?.product_quantity}
                                discount={item?.discount}
                            />
                        ))}
                </div>
            </Container>
            <Container class1="popular-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Các sản phẩm phổ biến</h3>
                    </div>
                </div>
                <div className="row">
                    {popularProducts && popularProducts.length > 0 ? (
                        popularProducts.slice(0, 4).map((item, index) => {
                            let displayPrice = item?.product_price;
                            let discountText = "";

                            if (item?.discount) {
                                if (item.discount.discount_type === "percentage") {
                                    displayPrice = item.product_price - (item.product_price * item.discount.discount_value / 100);
                                    discountText = `-${item.discount.discount_value}%`;
                                } else if (item.discount.discount_type === "fixed_amount") {
                                    displayPrice = item.product_price - item.discount.discount_value;
                                    discountText = `-${item.discount.discount_value.toLocaleString()}₫`;
                                }
                            }

                            return (
                                <div key={index} className={"col-3 pointer-cursor"} onClick={() => { navigate("/product/" + item?._id); window.scrollTo(0, 0); }}>
                                    <div className="product-card position-relative">
                                        {/* Badge giảm giá */}
                                        {discountText && (
                                            <div className="discount-badge position-absolute">
                                                {discountText}
                                            </div>
                                        )}
                                        <div className="product-image d-flex">
                                            <img
                                                src={item?.product_images[0]?.url}
                                                className="img-fluid mx-auto w-auto"
                                                alt="product"
                                            />
                                            {item?.product_images[1] && (
                                                <img
                                                    src={item?.product_images[1]?.url}
                                                    className="img-fluid mx-auto w-auto"
                                                    alt="product"
                                                />
                                            )}
                                        </div>
                                        <div className="product-details">
                                            <h6 className="brand">{item?.product_brand?.map((brand, index) => (
                                                <span key={brand._id}>
                                                    {brand.title}
                                                    {index < item.product_brand.length - 1 && " | "}
                                                </span>
                                            ))}</h6>
                                            <h5 className="product-title text-truncate">{item?.product_name}</h5>
                                            <div className="d-flex align-items-center justify-content-between gap-10">
                                                <Rating
                                                    className="mb-2"
                                                    initialRating={+item?.product_totalRating}
                                                    readonly
                                                    emptySymbol={<FaRegStar className="fs-5" style={{ color: '#f59e0b' }} />}
                                                    fullSymbol={<FaStar className="fs-5" style={{ color: '#f59e0b' }} />}
                                                />
                                                {item?.product_sold !== 0 && <span className="sold">Đã bán {item?.product_sold}</span>}
                                            </div>
                                            <div className="d-flex align-items-baseline gap-10">
                                                <p className="price text-danger fw-bold">
                                                    {displayPrice.toLocaleString()}₫
                                                </p>
                                                {item?.discount && (
                                                    <p className="original-price text-muted text-decoration-line-through">
                                                        {item?.product_price?.toLocaleString()}₫
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="action-bar position-absolute">
                                            <div className="d-flex flex-column gap-15"></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Không có sản phẩm phổ biến để hiển thị.</p>
                    )}
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
                        <h3 className="section-heading">Các bài viết mới nhất</h3>
                    </div>
                    <div className="row">
                        {
                            blogState && blogState?.map((item, index) => {
                                if (index < 4) {
                                    return (
                                        <div className="col-3" key={index}>
                                            <BlogCard
                                                id={item?.id}
                                                title={item?.blog_title}
                                                description={item?.blog_description}
                                                image={item?.blog_images[0]?.url}
                                                date={new Date(item?.createdAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
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
