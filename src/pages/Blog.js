import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { getAllBCategories } from "../features/bCategory/bCategorySlice";

import moment from "moment";

const Blog = () => {
    const blogState = useSelector((state) => state?.blog?.blog);
    const bCategoryState = useSelector((state) => state?.bCategory?.bCategories);
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);

    useEffect(() => {
        // Load tất cả blogs khi component mount
        dispatch(getAllBlogs({ categoryIds: [] }));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllBCategories());
    }, [dispatch]);

    useEffect(() => {
        // Chỉ gọi API nếu filterApplied là true
        if (filterApplied) {
            dispatch(getAllBlogs({ categoryIds: category }));
        }
    }, [category, filterApplied, dispatch]);

    const toggleCategory = (id) => {
        setFilterApplied(true);
        setCategory((prev) =>
            prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
        ); // Toggle ID trong danh sách
    };

    const clearFilter = () => {
        setCategory([]); // Xóa tất cả danh mục đã chọn
        setFilterApplied(false); // Tắt flag để ngăn useEffect gọi API
        dispatch(getAllBlogs({ categoryIds: [] })); // Gọi API lấy tất cả blogs
    };

    const categories = bCategoryState && bCategoryState?.data?.map((item) => ({
        id: item?._id,
        title: item?.title,
    }));

    return (
        <>
            <Meta title={"Electronics | Blogs"} />
            <BreadCrumb title="Blog" />
            <Container class1="blog-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-3">
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Tìm theo danh mục</h3>
                            <div>
                                <ul className="ps-0">
                                    {
                                        categories && categories?.map((categoryItem) => (
                                            <li
                                                key={categoryItem.id}
                                                className={`pointer-cursor ${category.includes(categoryItem.id) ? "selected" : ""
                                                    }`}
                                                onClick={() => toggleCategory(categoryItem.id)}
                                            >
                                                {categoryItem.title}
                                            </li>
                                        ))}
                                </ul>
                                <button
                                    className="btn btn-danger mt-3"
                                    onClick={clearFilter}
                                >
                                    Xóa bộ lọc
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            {
                                Array.isArray(blogState) && blogState.map((item, index) => {
                                    return (
                                        <div className="col-6 mb-3" key={index}>
                                            <BlogCard
                                                id={item?.id}
                                                title={item?.blog_title}
                                                description={item?.blog_description}
                                                image={item?.blog_images[0]?.url}
                                                date={new Date(item?.createdAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Blog;
