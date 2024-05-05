import React, { useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { IoShuffleOutline, IoHeartOutline } from "react-icons/io5";
import Container from "../components/Container";

// import watch from

const SingleProduct = () => {
  const [orderedProducts, setOrderedProducts] = useState(true);
  const props = {
    width: 600,
    height: 500,
    zoomWidth: 600,
    img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MT3D3ref_VW_34FR+watch-case-44-aluminum-midnight-cell-se_VW_34FR+watch-face-44-aluminum-midnight-se_VW_34FR?wid=5120&hei=3280&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=ajJYOEQxYjNlejNwbWNnSU16d0NYaWhSbVIzRFJTYlp1MEk4OWNDaTcvNTlEbzMrd1Z5SUpEd0hiT0ZLRlZGNHVDTzRRaC84T1VMbXJRN05SRldIelBRWnNWZWtLcTZCYVRER3FsWWowaTk5RG8zK3dWeUlKRHdIYk9GS0ZWRjR4cVNUNDJadDNVSmRncE9SalAvZ24wUVN3R3VxZWhYYXgwOHljYmZFMXBocmMyRTN3NCt6QkoxaUdRb0FBay9VYktGTHdENW9lYUFnak5pcy9ReEdDYitVd1NTQTM3UmZlcFMyUUhtajBOOUFTbk5vY3l1VDJCbGQ3QjJZZUd1bQ==",
  };

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  return (
    <>
      <Meta title={"Dynamic Produuct Name"} />
      <BreadCrumb title="Dynamic Product Name" />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              <div>
                <img
                  src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MT3D3ref_VW_34FR+watch-case-44-aluminum-midnight-cell-se_VW_34FR+watch-face-44-aluminum-midnight-se_VW_34FR?wid=5120&hei=3280&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=ajJYOEQxYjNlejNwbWNnSU16d0NYaWhSbVIzRFJTYlp1MEk4OWNDaTcvNTlEbzMrd1Z5SUpEd0hiT0ZLRlZGNHVDTzRRaC84T1VMbXJRN05SRldIelBRWnNWZWtLcTZCYVRER3FsWWowaTk5RG8zK3dWeUlKRHdIYk9GS0ZWRjR4cVNUNDJadDNVSmRncE9SalAvZ24wUVN3R3VxZWhYYXgwOHljYmZFMXBocmMyRTN3NCt6QkoxaUdRb0FBay9VYktGTHdENW9lYUFnak5pcy9ReEdDYitVd1NTQTM3UmZlcFMyUUhtajBOOUFTbk5vY3l1VDJCbGQ3QjJZZUd1bQ=="
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MT3D3ref_VW_34FR+watch-case-44-aluminum-midnight-cell-se_VW_34FR+watch-face-44-aluminum-midnight-se_VW_34FR?wid=5120&hei=3280&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=ajJYOEQxYjNlejNwbWNnSU16d0NYaWhSbVIzRFJTYlp1MEk4OWNDaTcvNTlEbzMrd1Z5SUpEd0hiT0ZLRlZGNHVDTzRRaC84T1VMbXJRN05SRldIelBRWnNWZWtLcTZCYVRER3FsWWowaTk5RG8zK3dWeUlKRHdIYk9GS0ZWRjR4cVNUNDJadDNVSmRncE9SalAvZ24wUVN3R3VxZWhYYXgwOHljYmZFMXBocmMyRTN3NCt6QkoxaUdRb0FBay9VYktGTHdENW9lYUFnak5pcy9ReEdDYitVd1NTQTM3UmZlcFMyUUhtajBOOUFTbk5vY3l1VDJCbGQ3QjJZZUd1bQ=="
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MT3D3ref_VW_34FR+watch-case-44-aluminum-midnight-cell-se_VW_34FR+watch-face-44-aluminum-midnight-se_VW_34FR?wid=5120&hei=3280&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=ajJYOEQxYjNlejNwbWNnSU16d0NYaWhSbVIzRFJTYlp1MEk4OWNDaTcvNTlEbzMrd1Z5SUpEd0hiT0ZLRlZGNHVDTzRRaC84T1VMbXJRN05SRldIelBRWnNWZWtLcTZCYVRER3FsWWowaTk5RG8zK3dWeUlKRHdIYk9GS0ZWRjR4cVNUNDJadDNVSmRncE9SalAvZ24wUVN3R3VxZWhYYXgwOHljYmZFMXBocmMyRTN3NCt6QkoxaUdRb0FBay9VYktGTHdENW9lYUFnak5pcy9ReEdDYitVd1NTQTM3UmZlcFMyUUhtajBOOUFTbk5vY3l1VDJCbGQ3QjJZZUd1bQ=="
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MT3D3ref_VW_34FR+watch-case-44-aluminum-midnight-cell-se_VW_34FR+watch-face-44-aluminum-midnight-se_VW_34FR?wid=5120&hei=3280&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=ajJYOEQxYjNlejNwbWNnSU16d0NYaWhSbVIzRFJTYlp1MEk4OWNDaTcvNTlEbzMrd1Z5SUpEd0hiT0ZLRlZGNHVDTzRRaC84T1VMbXJRN05SRldIelBRWnNWZWtLcTZCYVRER3FsWWowaTk5RG8zK3dWeUlKRHdIYk9GS0ZWRjR4cVNUNDJadDNVSmRncE9SalAvZ24wUVN3R3VxZWhYYXgwOHljYmZFMXBocmMyRTN3NCt6QkoxaUdRb0FBay9VYktGTHdENW9lYUFnak5pcy9ReEdDYitVd1NTQTM3UmZlcFMyUUhtajBOOUFTbk5vY3l1VDJCbGQ3QjJZZUd1bQ=="
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">
                  Kids Headphone Bulk 10 Pack Multi Colored For Students
                </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ 100.00</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={3}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">(2 reviews)</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className="border-bottom py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type : </h3>
                  <p className="product-data">Watchs</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand : </h3>
                  <p className="product-data">Havels</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category : </h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags : </h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availability : </h3>
                  <p className="product-data">in Stock</p>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size : </h3>
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
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Color : </h3>
                  <Color />
                </div>
                <div className="d-flex align-items-center gap-15 mt-2 mb-3">
                  <h3 className="product-heading">Quantity : </h3>
                  <div>
                    <input
                      type="number"
                      name=""
                      min={1}
                      max={10}
                      className="form-control"
                      style={{ width: "70px" }}
                      id=""
                    />
                  </div>
                  <div className="d-flex align-items-center gap-15 ms-5">
                    <button type="submit" className="button border-0">
                      Add to cart
                    </button>
                    <Link to="/signup" className="button signup">
                      Buy it now
                    </Link>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div className="">
                    <a href="">
                      <IoHeartOutline className="fs-5 me-2" />
                      Add to wishlist
                    </a>
                  </div>
                  <div className="">
                    <a href="">
                      <IoShuffleOutline className="fs-5 me-2" />
                      Add to compare
                    </a>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column my-3">
                  <h3 className="product-heading">Shipping & Returns: </h3>
                  <p className="product-data">
                    Free shipping and returns available on all order! <br />
                    We ship all US domestic order within{" "}
                    <b>5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Product link: </h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(
                        "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MT3D3ref_VW_34FR+watch-case-44-aluminum-midnight-cell-se_VW_34FR+watch-face-44-aluminum-midnight-se_VW_34FR?wid=5120&hei=3280&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=ajJYOEQxYjNlejNwbWNnSU16d0NYaWhSbVIzRFJTYlp1MEk4OWNDaTcvNTlEbzMrd1Z5SUpEd0hiT0ZLRlZGNHVDTzRRaC84T1VMbXJRN05SRldIelBRWnNWZWtLcTZCYVRER3FsWWowaTk5RG8zK3dWeUlKRHdIYk9GS0ZWRjR4cVNUNDJadDNVSmRncE9SalAvZ24wUVN3R3VxZWhYYXgwOHljYmZFMXBocmMyRTN3NCt6QkoxaUdRb0FBay9VYktGTHdENW9lYUFnak5pcy9ReEdDYitVd1NTQTM3UmZlcFMyUUhtajBOOUFTbk5vY3l1VDJCbGQ3QjJZZUd1bQ=="
                      );
                    }}
                  >
                    Copy product link
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
              <p>
                Lorem ipsum dolor sit amet consectetur adipisici elit. Quod
                amet, explicabo ut quasi sed eos culpa dolorum architecto id,
                nihil impedit quas. Cum aspernatur excepturi possimus quam
                quisquam, blanditiis eveniet.
              </p>
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
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Base on 2 reviews</p>
                  </div>
                </div>
                {orderedProducts && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a review</h4>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={true}
                      activeColor="#ffd700"
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
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0">Submit Review</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                <div className="review">
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">Navdeep</h6>
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quasi expedita minus cum error beatae deserunt facilis vel
                    harum officia accusantium? Fugit consequuntur architecto
                    neque laboriosam eius asperiores delectus unde ducimus?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our popular products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
