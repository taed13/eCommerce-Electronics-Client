import React, { useEffect, useRef, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import { useDispatch, useSelector } from "react-redux";
import {
    addRating,
    getAllProducts,
    getAProduct,
} from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addProdToCart, getOrders, getUserCart } from "../features/user/userSlice";
import Container from "../components/Container";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Rating from 'react-rating';
import { FaStar, FaRegStar } from "react-icons/fa";

const SingleProduct = () => {
    const textAreaRef = useRef(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const [popularProducts, setPopularProducts] = useState([]);
    const [star, setStar] = useState(0);
    const [comment, setComment] = useState("");
    const [canRate, setCanRate] = useState(false);

    const getProductId = location.pathname.split("/")[2];
    const splideId = "splide-product-images";
    const productState = useSelector((state) => state?.product?.singleproduct);
    const productsState = useSelector((state) => state?.product?.product);
    const cartState = useSelector((state) => state?.auth?.cartProducts);
    const userState = useSelector((state) => state?.auth?.user);
    const orderState = useSelector((state) => state?.auth?.getOrderedProduct);

    const [mainImage, setMainImage] = useState(
        productState?.product_images?.[0]?.url ||
        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
    );

    const props = {
        width: 600,
        height: 500,
        zoomWidth: 600,
        img: mainImage,
    };

    useEffect(() => {
        dispatch(getAProduct(getProductId));
        dispatch(getUserCart());
        dispatch(getAllProducts());
        dispatch(getOrders());
    }, [dispatch, getProductId]);

    useEffect(() => {
        for (let index = 0; index < cartState?.length; index++) {
            if (getProductId === cartState[index]?.productId?._id) {
                setAlreadyAdded(true);
            }
        }
    }, [cartState, getProductId]);

    const uploadCart = () => {
        if (color === null) {
            toast.error("Hãy chọn màu sắc sản phẩm");
            return false;
        } else {
            const data = {
                productId: productState?._id,
                product_color: [
                    {
                        code: productState?.product_color?.find((item) => item._id === color)?.code,
                        name: productState?.product_color?.find((item) => item._id === color)?.title,
                    },
                ],
                quantity: quantity,
                price: productState?.product_price,
                name: productState?.product_name,
            };
            dispatch(addProdToCart(data));
            setAlreadyAdded(false);
            navigate("/cart");
            window.scrollTo(0, 0);
        }
    };

    const copyToClipboard = (text) => {
        var textField = document.createElement("textarea");
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand("copy");
        textField.remove();
    };

    useEffect(() => {
        const data =
            productsState &&
            productsState?.filter((product) =>
                product.product_tags?.some(
                    (tag) => tag.name.toLowerCase() === "popular"
                )
            );
        setPopularProducts(data);
    }, [productsState]);

    useEffect(() => {
        setMainImage(productState?.product_images?.[0]?.url ||
            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930");
    }, [productState]);

    const addRatingToProduct = () => {
        if (star === 0) {
            toast.error("Hãy đánh giá sản phẩm");
            return;
        } else if (comment === "") {
            toast.error("Hãy viết bình luận");
            return false;
        } else {
            dispatch(
                addRating({ star: star, comment: comment, prodId: getProductId })
            );
            setTimeout(() => {
                dispatch(getAProduct(getProductId));
            }, 1000);
        }
    };

    const scrollToReviewForm = () => {
        if (textAreaRef.current) {
            textAreaRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            textAreaRef.current.focus();
        }
    };

    useEffect(() => {
        if (productState?.product_images?.length > 0) {
            const splide = new Splide(`#${splideId}`, {
                perPage: 3,
                perMove: 1,
                pagination: false,
                arrows: true,
                breakpoints: {
                    768: {
                        perPage: 2,
                    },
                    480: {
                        perPage: 1,
                    },
                },
            }).mount();

            return () => {
                splide.destroy();
            };
        }
    }, [productState]);

    useEffect(() => {
        if (userState && orderState) {
            const orderedProducts = orderState.flatMap(order => order.order_items);
            setCanRate(orderedProducts.some(item => item.productId._id === getProductId));
        } else {
            setCanRate(false);
        }
    }, [userState, orderState, getProductId]);

    return (
        <>
            <Meta title={"Electronics | " + productState?.product_name} />
            <BreadCrumb title={productState?.product_name} />
            <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <ReactImageZoom {...props} />
                            </div>
                        </div>
                        <div className="other-product-images">
                            <div id={splideId} className="splide">
                                <div className="splide__track">
                                    <ul className="splide__list">
                                        {productState?.product_images?.map((item, index) => (
                                            <li key={index} className="splide__slide d-flex align-items-center justify-content-center p-4">
                                                <img
                                                    src={item?.url}
                                                    className="img-fluid pointer-cursor"
                                                    alt={`Product ${index}`}
                                                    onClick={() => setMainImage(item?.url)}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h3 className="title" style={{fontSize: '24px'}}>{productState ? productState.product_name : 'No product found'}</h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className="price my-3 fw-light" style={{fontSize: '28px'}}>{productState ? '₫' + productState?.product_price.toLocaleString()  : 'N/A'}</p>
                                <div className="d-flex align-items-end gap-1">
                                    <p className="mb-0 t-review fs-6" style={{lineHeight: '20px'}}>{productState?.product_totalRating || 0}</p>
                                    <Rating
                                        initialRating={+productState?.product_totalRating || 0}
                                        readonly
                                        emptySymbol={<FaRegStar className="fs-6" style={{ color: '#f59e0b' }} />}
                                        fullSymbol={<FaStar className="fs-6" style={{ color: '#f59e0b' }} />}
                                    />
                                    <p className="mb-0 t-review text-primary">
                                        ({productState?.product_ratings?.length} đánh giá)
                                    </p>
                                </div>
                                {
                                    canRate &&
                                    <a className="review-btn mt-2 hover-underline" href="#review">
                                        Viết đánh giá
                                    </a>
                                }
                            </div>
                            <div className="border-bottom py-3">
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Hãng: </h3>
                                    <p className="product-data">
                                        {productState ?
                                            productState?.product_brand?.map((brand, index) => (
                                                <span key={brand._id}>
                                                    {brand.title}
                                                    {index < productState.product_brand.length - 1 &&
                                                        " | "}
                                                </span>
                                            ))
                                            : 'N/A'}
                                    </p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Danh mục: </h3>
                                    <p className="product-data">
                                        {productState ?
                                            productState?.product_category?.map((category, index) => (
                                                <span key={category._id}>
                                                    {category.title}
                                                    {index < productState.product_category.length - 1 &&
                                                        " | "}
                                                </span>
                                            )) : 'N/A'
                                        }
                                    </p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Tag sản phẩm: </h3>
                                    <p className="product-data">
                                        {productState ?
                                            productState?.product_tags?.map((tags, index) => (
                                                <span key={tags._id}>
                                                    {tags.name}
                                                    {index < productState.product_tags.length - 1 &&
                                                        " | "}
                                                </span>
                                            )) : 'N/A'}
                                    </p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Trạng thái: </h3>
                                    <p className="product-data">
                                        {productState?.product_quantity > 0
                                            ? "Còn hàng" + " - " + productState?.product_quantity + " sản phẩm"
                                            : "Đã bán hết"}
                                    </p>
                                </div>
                                {alreadyAdded === false && (
                                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                        <div className="d-flex flex-wrap gap-2">
                                            <h3 className="product-heading align-self-center">Màu: </h3>
                                            {productState &&
                                                productState?.product_color?.map((colorItem) => (
                                                    <div
                                                        key={colorItem._id}
                                                        onClick={() => setColor(colorItem._id)}
                                                        className="color-box"
                                                        style={{
                                                            backgroundColor: colorItem.code,
                                                            width: "20px",
                                                            height: "20px",
                                                            borderRadius: "50%",
                                                            cursor: "pointer",
                                                            border:
                                                                color === colorItem._id
                                                                    ? "2px solid black"
                                                                    : "1px solid #ccc",
                                                        }}
                                                    ></div>
                                                ))}
                                        </div>
                                        {productState && !color && (
                                            <span className="product-data text-danger">
                                                Hãy chọn màu sắc sản phẩm!
                                            </span>
                                        )}
                                    </div>
                                )}
                                <div className="d-flex align-items-center gap-15 mt-2 mb-3">
                                    {alreadyAdded === false && (
                                        <>
                                            <h3 className="product-heading">Số lượng: </h3>
                                            <div>
                                                <input
                                                    type="number"
                                                    name=""
                                                    min={1}
                                                    max={productState?.product_quantity}
                                                    className="form-control"
                                                    style={{ width: "70px" }}
                                                    id=""
                                                    onChange={(e) => {
                                                        let value = parseInt(e.target.value, 10);
                                                        if (isNaN(value)) value = 1;
                                                        if (value < 1) value = 1;
                                                        if (value > productState?.product_quantity) value = productState?.product_quantity;
                                                        setQuantity(value);
                                                    }}
                                                    value={quantity}
                                                />
                                            </div>
                                        </>
                                    )}
                                    <div className={alreadyAdded ? "ms-0" : "ms-5"}>
                                        <button
                                            type="button"
                                            className="button border-0"
                                            onClick={() => {
                                                alreadyAdded
                                                    ? navigate("/cart")
                                                    : uploadCart(productState?._id);
                                            }}
                                        >
                                            {alreadyAdded ? "Đi đến giỏ hàng" : "Thêm vào giỏ hàng"}
                                        </button>
                                    </div>
                                </div>

                                <div className="d-flex gap-10 flex-column my-3">
                                    <h3 className="product-heading">Vận chuyển & Đổi trả: </h3>
                                    {
                                        productState
                                            ? <p className="product-data">
                                                Miễn phí vận chuyển và đổi trả cho tất cả các đơn hàng!{" "}
                                                <br />
                                                Chúng tôi vận chuyển tất cả các đơn hàng nội địa Việt Nam
                                                trong vòng <b>5-10 ngày làm việc!</b>
                                            </p>
                                            : <p className="product-data">N/A</p>
                                    }
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Link sản phẩm: </h3>
                                    <a
                                        href="javascript:void(0);"
                                        onClick={() => {
                                            copyToClipboard(window.location.href);
                                            toast.success("Đã sao chép đường dẫn");
                                        }}
                                    >
                                        Sao chép đường dẫn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="description-wrapper pb-5 home-wrapper-2">
                <div className="row">
                    <div className="col-9">
                        <h4>Mô tả sản phẩm</h4>
                        <div className="bg-white p-3">
                            {
                                productState
                                    ? <p dangerouslySetInnerHTML={{ __html: productState?.product_description, }}></p>
                                    : "N/A"
                            }
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="reviews-wrapper home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 id="review">Đánh giá & Bình luận</h3>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                                    <h4 className="mb-2 fw-bold">Khách hàng đánh giá</h4>
                                    <div className="d-flex flex-col align-items-end gap-10 mt-3">
                                        <Rating
                                            initialRating={+productState?.product_totalRating || 0}
                                            readonly
                                            emptySymbol={<FaRegStar className="fs-2" style={{ color: '#f59e0b' }} />}
                                            fullSymbol={<FaStar className="fs-2" style={{ color: '#f59e0b' }} />}
                                        />
                                        <span className="mb-0">
                                            {+productState?.product_totalRating || 0} out of 5
                                        </span>
                                    </div>
                                    <p className="mt-2 mb-0">
                                        (Dựa trên {productState?.product_ratings?.length} đánh giá)
                                    </p>
                                </div>
                                {canRate && (
                                    <div>
                                        <a
                                            className="text-dark text-decoration-underline"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                scrollToReviewForm();
                                            }}
                                        >
                                            Viết đánh giá
                                        </a>
                                    </div>
                                )}
                            </div>
                            {
                                canRate &&
                                <div className="review-form py-4">
                                    <h4>Viết đánh giá</h4>
                                    <form action="" className="d-flex flex-column gap-15">
                                        <div>
                                            <Rating
                                                initialRating={star}
                                                emptySymbol={<FaRegStar className="fs-5" style={{ color: '#f59e0b' }} />}
                                                fullSymbol={<FaStar className="fs-5" style={{ color: '#f59e0b' }} />}
                                                onChange={(newRating) => {
                                                    setStar(newRating);
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                name=""
                                                id=""
                                                className="form-control w-100"
                                                cols="30"
                                                rows="4"
                                                ref={textAreaRef}
                                                placeholder="Write your comment here..."
                                                onChange={(e) => {
                                                    setComment(e.target.value);
                                                }}
                                            ></textarea>
                                        </div>
                                        <div className="d-flex justify-content-end mt-3">
                                            <button
                                                className="button border-0"
                                                type="button"
                                                onClick={addRatingToProduct}
                                            >
                                                Gửi đánh giá
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            }
                            <div className="reviews mt-4">
                                {
                                    productState?.product_ratings?.map((item, index) => {
                                        return (
                                            <div className="review" key={index}>
                                                <div className="d-flex align-items-end gap-10">
                                                    <span className="mb-0">Khach hang than thiet</span>
                                                </div>
                                                <Rating
                                                    className="mt-2"
                                                    initialRating={item?.star}
                                                    readonly
                                                    emptySymbol={<FaRegStar className="fs-5" style={{ color: '#f59e0b' }} />}
                                                    fullSymbol={<FaStar className="fs-5" style={{ color: '#f59e0b' }} />}
                                                />
                                                <p className="mt-3">{item?.comment}</p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="popular-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Các sản phẩm phổ biến</h3>
                    </div>
                </div>
                <div className="row">
                    <ProductCard data={popularProducts ? popularProducts.slice(0, 4) : []} />
                </div>
            </Container>
        </>
    );
};

export default SingleProduct;