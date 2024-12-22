import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { IoShuffleOutline, IoHeartOutline } from "react-icons/io5";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
    addRating,
    getAllProducts,
    getAProduct,
} from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../features/user/userSlice";

const SingleProduct = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const [popularProducts, setPopularProducts] = useState([]);
    const [orderedProducts, setOrderedProducts] = useState(true);
    const [star, setStar] = useState(0);
    const [comment, setComment] = useState("");

    const getProductId = location.pathname.split("/")[2];
    const productState = useSelector((state) => state?.product?.singleproduct);
    const productsState = useSelector((state) => state?.product?.product);
    const cartState = useSelector((state) => state?.auth?.cartProducts);

    const props = {
        width: 600,
        height: 500,
        zoomWidth: 600,
        img: productState?.product_images[0]?.url
            ? productState?.product_images[0]?.url
            : "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MT3D3ref_VW_34FR+watch-case-44-aluminum-midnight-cell-se_VW_34FR+watch-face-44-aluminum-midnight-se_VW_34FR?wid=5120&hei=3280&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=ajJYOEQxYjNlejNwbWNnSU16d0NYaWhSbVIzRFJTYlp1MEk4OWNDaTcvNTlEbzMrd1Z5SUpEd0hiT0ZLRlZGNHVDTzRRaC84T1VMbXJRN05SRldIelBRWnNWZWtLcTZCYVRER3FsWWowaTk5RG8zK3dWeUlKRHdIYk9GS0ZWRjR4cVNUNDJadDNVSmRncE9SalAvZ24wUVN3R3VxZWhYYXgwOHljYmZFMXBocmMyRTN3NCt6QkoxaUdRb0FBay9VYktGTHdENW9lYUFnak5pcy9ReEdDYitVd1NTQTM3UmZlcFMyUUhtajBOOUFTbk5vY3l1VDJCbGQ3QjJZZUd1bQ==",
    };

    useEffect(() => {
        dispatch(getAProduct(getProductId));
        dispatch(getUserCart());
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        for (let index = 0; index < cartState?.length; index++) {
            if (getProductId === cartState[index]?.productId?._id) {
                setAlreadyAdded(true);
            }
        }
    }, []);

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

    const addRatingToProduct = () => {
        if (star === 0) {
            toast.error("Hãy đánh giá sản phẩm");
            return false;
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

        return false;
    };

    return (
        <>
            <Meta title={productState?.product_name} />
            <BreadCrumb title={productState?.product_name} />
            <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <ReactImageZoom {...props} />
                            </div>
                        </div>
                        <div className="other-product-images d-flex flex-wrap gap-15">
                            {productState &&
                                productState?.product_images?.map((item, index) => {
                                    return (
                                        <div>
                                            <img src={item?.url} className="img-fluid" alt="" />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h3 className="title">{productState?.product_name}</h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className="price">{productState?.product_price} VND</p>
                                <div className="d-flex align-items-center gap-10">
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={productState?.product_totalRating}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                    <p className="mb-0 t-review">
                                        ({productState?.product_ratings?.length} đánh giá)
                                    </p>
                                </div>
                                <a className="review-btn" href="#review">
                                    Viết đánh giá
                                </a>
                            </div>
                            <div className="border-bottom py-3">
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Type: </h3>
                                    <p className="product-data">Đồng hồ</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Hãng: </h3>
                                    <p className="product-data">
                                        {productState &&
                                            productState?.product_brand?.map((brand, index) => (
                                                <span key={brand._id}>
                                                    {brand.title}
                                                    {index < productState.product_brand.length - 1 &&
                                                        " | "}
                                                </span>
                                            ))}
                                    </p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Danh mục: </h3>
                                    <p className="product-data">
                                        {productState &&
                                            productState?.product_category?.map((category, index) => (
                                                <span key={category._id}>
                                                    {category.title}
                                                    {index < productState.product_category.length - 1 &&
                                                        " | "}
                                                </span>
                                            ))}
                                    </p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Tag sản phẩm: </h3>
                                    <p className="product-data">
                                        {productState &&
                                            productState?.product_tags?.map((tags, index) => (
                                                <span key={tags._id}>
                                                    {tags.name}
                                                    {index < productState.product_tags.length - 1 &&
                                                        " | "}
                                                </span>
                                            ))}
                                    </p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Trạng thái: </h3>
                                    <p className="product-data">
                                        {productState?.product_quantity > 0
                                            ? "Còn hàng"
                                            : "Đã bán hết"}
                                    </p>
                                </div>
                                {/* <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                    <h3 className="product-heading">Size: </h3>
                                    <div className="d-flex flex-wrap gap-15">
                                        <span className="badge border border-1 bg-white text-dark border-secondary">
                                            S
                                        </span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">
                                            M
                                        </span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">
                                            L
                                        </span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">
                                            XL
                                        </span>
                                    </div>
                                </div> */}
                                {alreadyAdded === false && (
                                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                        <h3 className="product-heading">Màu: </h3>
                                        <div className="d-flex flex-wrap gap-2">
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
                                        {!color && (
                                            <p className="text-danger mt-2">
                                                Hãy chọn màu sắc sản phẩm!
                                            </p>
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
                                                        if (value > productState?.product_quantity) value = productState?.product_quantity; // Giới hạn trên
                                                        setQuantity(value);
                                                    }}
                                                    value={quantity}
                                                />
                                            </div>
                                        </>
                                    )}
                                    <div
                                        className={
                                            "d-flex align-items-center gap-15" + alreadyAdded
                                                ? "ms-0"
                                                : "ms-5"
                                        }
                                    >
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
                                        {/* <Link to="/signup" className="button signup">Buy it now</Link> */}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <div className="">
                                        <a href="">
                                            <IoHeartOutline className="fs-5 me-2" />
                                            Thêm vào danh sách yêu thích
                                        </a>
                                    </div>
                                    <div className="">
                                        <a href="">
                                            <IoShuffleOutline className="fs-5 me-2" />
                                            So sánh sản phẩm
                                        </a>
                                    </div>
                                </div>
                                <div className="d-flex gap-10 flex-column my-3">
                                    <h3 className="product-heading">Vận chuyển & Đổi trả: </h3>
                                    <p className="product-data">
                                        Miễn phí vận chuyển và đổi trả cho tất cả các đơn hàng!{" "}
                                        <br />
                                        Chúng tôi vận chuyển tất cả các đơn hàng nội địa Việt Nam
                                        trong vòng <b>5-10 ngày làm việc!</b>
                                    </p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Link sản phẩm: </h3>
                                    <a
                                        href="javascript:void(0);"
                                        onClick={() => {
                                            copyToClipboard(window.location.href);
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
            <Container class1="description-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4>Description</h4>
                        <div className="bg-white p-3">
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: productState?.product_description,
                                }}
                            ></p>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="reviews-wrapper home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 id="review">Reviews</h3>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                                    <h4 className="mb-2">Đánh giá từ khách hàng</h4>
                                    <div className="d-flex align-items-center gap-10">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={+productState?.product_totalRating}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <p className="mb-0">
                                            Dựa theo {productState?.product_ratings?.length} đánh giá
                                        </p>
                                    </div>
                                </div>
                                {orderedProducts && (
                                    <div>
                                        <a className="text-dark text-decoration-underline" href="">
                                            Viết đánh giá
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="review-form py-4">
                                <h4>Viết đánh giá</h4>
                                <form action="" className="d-flex flex-column gap-15">
                                    <div>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={0}
                                            edit={true}
                                            activeColor="#ffd700"
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
                            {/* <div className="reviews mt-4">
                                {
                                    productState?.product_ratings?.map((item, index) => {
                                        return (
                                            <div className="review" key={index}>
                                                <div className="d-flex align-items-center gap-10">
                                                    <ReactStars
                                                        count={5}
                                                        size={24}
                                                        value={item?.star}
                                                        edit={false}
                                                        activeColor="#ffd700"
                                                    />
                                                    <p className="mb-0">Dựa trên 2 đánh giá</p>
                                                </div>
                                                <p className="mt-3">{item?.comment}</p>
                                            </div>
                                        );
                                    })
                                }
                            </div> */}
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
                    <ProductCard data={popularProducts} />
                </div>
            </Container>
        </>
    );
};

export default SingleProduct;
