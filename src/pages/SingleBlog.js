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
    }, [blogId]);

    const getBlog = () => {
        dispatch(getBlogById(blogId));
    };

    console.log(blogState);

    return (
        <>
            <Meta title={"Electronics | " + blogState?.data?.blog_title} />
            <BreadCrumb title={blogState?.data?.blog_title} />
            <Container class1="blog-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="single-blog-card">
                            <Link to="/blogs" className="d-flex align-items-center gap-10">
                                <HiOutlineArrowLeft className="fs-4" />
                                Quay lại trang blog
                            </Link>
                            <h3 className="title text-center">{blogState?.data?.blog_title}</h3>
                            <img
                                src={
                                    blogState?.data?.blog_images[0]?.url
                                        ? blogState?.data?.blog_images[0]?.url
                                        : blog
                                }
                                className="img-fluid my-4"
                                alt="blog"
                                style={{
                                    width: "600px",
                                    maxWidth: "100%",
                                    margin: "0 auto",
                                    display: "block",
                                    borderRadius: "10px",
                                }}
                            />
                            <span className="">{blogState?.data?.createdAt}</span>
                            <div className="d-flex justify-content-center align-items-center w-100">
                                <div className="w-75 fs-3" dangerouslySetInnerHTML={{ __html: blogState?.data?.blog_description, }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default SingleBlog;
