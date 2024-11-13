import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import ReactStars from "react-rating-stars-component";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";

const Store = () => {
    const dispatch = useDispatch();

    const [grid, setGrid] = useState(4);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);

    // Filter State
    const [brand, setBrand] = useState([]);
    const [category, setCategory] = useState([]);
    const [tag, setTag] = useState([]);
    const [color, setColor] = useState([]);
    const [maxPrice, setMaxPrice] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [sort, setSort] = useState("manual");

    const productState = useSelector((state) => state?.product?.product);

    useEffect(() => {
        getProducts();
    }, [brand, category, tag, color, minPrice, maxPrice, sort]);

    const getProducts = () => {
        dispatch(
            getAllProducts({ sort, brand, category, tag, minPrice, maxPrice })
        );
    };

    useEffect(() => {
        let newBrands = [];
        let categories = [];
        let newTags = [];
        let newColors = [];
        for (let i = 0; i < productState?.length; i++) {
            const element = productState[i];
            newBrands.push(element.brand);
            categories.push(element.category);
            newColors.push(element.color);

            const splitTags = element.tags.split(",").map((tag) => tag.trim());
            newTags = [...newTags, ...splitTags];
        }
        setBrands(newBrands);
        setCategories(categories);
        setTags(newTags);
        setColors(newColors);
    }, [productState]);

    return (
        <>
            <Meta title={"Our Store"} />
            <BreadCrumb title="Our Store" />
            <Container class1="store-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-3">
                        {/* <div className="filter-card mb-3">
                            <h3 className="filter-title">Shop By Categories</h3>
                            <div>
                                <ul className="ps-0">
                                    {categories &&
                                        [...new Set(categories)].map((category, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    onClick={() => {
                                                        setCategory(category);
                                                    }}
                                                >
                                                    {category}
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </div> */}
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Filter By</h3>
                            {/* <div>
                                <h5 className="sub-title">Availability</h5>
                                <div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id=""
                                        />
                                        <label className="form-check-label" htmlFor="">
                                            In stock (1)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id=""
                                        />
                                        <label className="form-check-label" htmlFor="">
                                            Out of stock (0)
                                        </label>
                                    </div>
                                </div>
                            </div> */}
                            <h5 className="sub-title">Price</h5>
                            <div className="d-flex align-items-center gap-10">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="floatingInput1"
                                        placeholder="From"
                                        onChange={(e) => {
                                            setMinPrice(e.target.value);
                                        }}
                                    />
                                    <label htmlFor="floatingInput1">From</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="floatingInput2"
                                        placeholder="To"
                                        onChange={(e) => {
                                            setMaxPrice(e.target.value);
                                        }}
                                    />
                                    <label htmlFor="floatingInput2">To</label>
                                </div>
                            </div>
                            {/* <h5 className="sub-title">Color</h5>
                            <div>
                                <Color />
                            </div>
                            <h5 className="sub-title">Size</h5>
                            <div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="size-1"
                                    />
                                    <label className="form-check-label" htmlFor="size-1">
                                        S (2)
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="size-2"
                                    />
                                    <label className="form-check-label" htmlFor="size-2">
                                        M (2)
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="size-3"
                                    />
                                    <label className="form-check-label" htmlFor="size-3">
                                        L (2)
                                    </label>
                                </div>
                            </div> */}
                            <div className="mb-3 mt-4">
                                <h3 className="sub-title">Product Tags</h3>
                                <div>
                                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                        {tags &&
                                            [...new Set(tags)].map((tag, index) => {
                                                return (
                                                    <span key={index} onClick={() => setTag(tag)} className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3 pointer-cursor background-hover">
                                                        {tag}
                                                    </span>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 mt-4">
                                <h3 className="sub-title">Product Brands</h3>
                                <div>
                                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                        {brands &&
                                            [...new Set(brands)].map((brand, index) => {
                                                return (
                                                    <span key={index} onClick={() => setBrand(brand)} className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3 pointer-cursor background-hover">
                                                        {brand}
                                                    </span>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="filter-sort-grid mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-10">
                                    <p className="mb-0" style={{ width: "100px" }}>
                                        Sort by:
                                    </p>
                                    <select
                                        defaultValue={"manual"}
                                        name="sort-by"
                                        className="form-control form-select"
                                        id="sort-by"
                                        onChange={(e) => {
                                            setSort(e.target.value);
                                        }}
                                    >
                                        {/* <option value="manual">Featured</option>
                                        <option value="best-selling">Best selling</option> */}
                                        <option value="title">Alphabetically, A-Z</option>
                                        <option value="-title">Alphabetically, Z-A</option>
                                        <option value="price">Price, low to high</option>
                                        <option value="-price">Price, high to low</option>
                                        <option value="option">Date, old to new</option>
                                        <option value="-option">Date, new to old</option>
                                    </select>
                                </div>
                                <div>
                                    <div className="d-flex align-items-center gap-10">
                                        <p className="totalproducts mb-0">
                                            {productState?.length} {productState?.length === 1 ? "Product" : "Products"}
                                        </p>
                                        <div className="d-flex gap-10 align-items-center grid">
                                            <img
                                                onClick={() => {
                                                    setGrid(3);
                                                }}
                                                src="images/gr4.svg"
                                                className="d-block img-fluid"
                                                alt="grid"
                                            />
                                            <img
                                                onClick={() => {
                                                    setGrid(4);
                                                }}
                                                src="images/gr3.svg"
                                                className="d-block img-fluid"
                                                alt="grid"
                                            />
                                            <img
                                                onClick={() => {
                                                    setGrid(6);
                                                }}
                                                src="images/gr2.svg"
                                                className="d-block img-fluid"
                                                alt="grid"
                                            />
                                            <img
                                                onClick={() => {
                                                    setGrid(12);
                                                }}
                                                src="images/gr.svg"
                                                className="d-block img-fluid"
                                                alt="grid"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="products-list pb-5">
                            <div className="d-flex gap-10 flex-wrap">
                                <ProductCard
                                    data={productState ? productState : []}
                                    grid={grid}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Store;
