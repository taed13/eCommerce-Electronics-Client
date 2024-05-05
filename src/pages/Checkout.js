import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import watch from "../images/watch.jpg";
import Container from "../components/Container";

const Checkout = () => {
  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Electroholic</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item partial-price active">
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item partial-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item partial-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details">John Doe (johndoe101@gmail.com)</p>
              <h4 className="mb-3">Shipping address</h4>
              <form
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select Country
                    </option>
                  </select>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First name (optional)"
                    className="form-control"
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last name"
                    className="form-control"
                  />
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                  />
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, suite, etc.. (optional)"
                    className="form-control"
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                  />
                </div>
                <div className="flex-grow-1">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select state
                    </option>
                  </select>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    className="form-control"
                  />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link
                      to="/cart"
                      className="text-dark d-flex align-items-center"
                    >
                      <IoIosArrowBack className="fs-5 me-1" />
                      Return to cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue to shipping
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4 d-flex flex-column gap-30">
              <div className="d-flex justify-content-between gap-10 align-items-center">
                <div className="w-75 d-flex gap-15">
                  <div className="w-25 position-relative">
                    <span className="checkout-product-number-badge badge">
                      1
                    </span>
                    <img src={watch} className="img-fluid" alt="product" />
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <h5 className="total">
                      Kids headphones bulk 10 pack multi colored for students
                    </h5>
                    <p className="partial mb-0">S/ #777777</p>
                  </div>
                </div>
                <div className="w-25 flex-grow-1 d-flex align-items-center justify-content-end">
                  <h5 className="partial-price mb-0">$ 100.00</h5>
                </div>
              </div>
              <div className="d-flex justify-content-between gap-10 align-items-center">
                <div className="w-75 d-flex gap-15">
                  <div className="w-25 position-relative">
                    <span className="checkout-product-number-badge badge">
                      6
                    </span>
                    <img src={watch} className="img-fluid" alt="product" />
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <h5 className="total">
                      Kids headphones bulk 10 pack multi colored for students{" "}
                    </h5>
                    <p className="partial mb-0">S/ #777777</p>
                  </div>
                </div>
                <div className="w-25 flex-grow-1 d-flex align-items-center justify-content-end">
                  <h5 className="partial-price mb-0">$ 100.00</h5>
                </div>
              </div>
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="partial">Subtotal</p>
                <p className="partial-price">$ 1000.00</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 partial">Shipping</p>
                <p className="mb-0 partial-price">$ 34.00</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">$ 1034.00</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
