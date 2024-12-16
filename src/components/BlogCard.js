import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BlogCard = ({ id, title, description, image, date }) => {
    return (
        <div className="blog-card">
            <div className="card-image" style={{ height: "150px", overflow: "hidden" }}>
                <img
                    src={image || "images/blog-1.jpg"}
                    className="img-fluid w-100"
                    alt={title || "blog image"}
                    style={{ objectFit: "contain", height: "100%", width: "100%" }}
                />
            </div>
            <div className="blog-content">
                <p className="date">{date}</p>
                <h5 className="title">{title}</h5>
                <p
                    className="desc"
                    dangerouslySetInnerHTML={{
                        __html: description?.substr(0, 70) + "...",
                    }}
                ></p>
                <Link to={`/blog/${id}`} className="button">
                    Đọc thêm
                </Link>
            </div>
        </div>
    );
};

BlogCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    date: PropTypes.string.isRequired,
};

export default BlogCard;
