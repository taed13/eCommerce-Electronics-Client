import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import blog from "../images/blog-1.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getBlogById } from "../features/blogs/blogSlice";

const SingleBlog = () => {
    const blogState = useSelector((state) => state?.blog?.singleBlog);
    const location = useLocation();
    const blogId = location.pathname.split("/")[2];
    const dispatch = useDispatch();
    useEffect(() => {
        getBlog();
    }, []);

    const getBlog = () => {
        dispatch(getBlogById(blogId));
    };

    console.log(blogState);

    return (
        <>
            <Meta title={blogState?.data?.title} />
            <BreadCrumb title={blogState?.data?.title} />
            <Container class1="blog-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="single-blog-card">
                            <Link to="/blogs" className="d-flex align-items-center gap-10">
                                <HiOutlineArrowLeft className="fs-4" />
                                Quay lại trang blog
                            </Link>
                            <h3 className="title">{blogState?.data?.title}</h3>
                            <img
                                src={
                                    blogState?.data?.image[0]?.url
                                        ? blogState?.data?.image[0]?.url
                                        : blog
                                }
                                className="img-fluid w-100 my-4"
                                alt="blog"
                            />
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: blogState?.data?.description,
                                }}
                            ></p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default SingleBlog;
