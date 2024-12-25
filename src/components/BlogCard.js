import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

const BlogCard = ({ id, title, description, image, date }) => {
    const navigate = useNavigate();
    const getPlainText = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
    };

    const plainTextDescription = getPlainText(description);

    return (
        <div className="blog-card pointer-cursor" onClick={() => {window.scrollTo(0, 0); navigate('/blog/' + id)}}>
            <div className="card-image" style={{ height: "200px", overflow: "hidden" }}>
                <img
                    src={image || "images/blog-1.jpg"}
                    className="img-fluid w-100"
                    alt={title || "blog image"}
                    style={{ objectFit: "contain", height: "100%", width: "100%" }}
                />
            </div>
            <div className="blog-content">
                <p className="date">{date}</p>
                <h5 className="title">{title.substr(0, 40) + "..."}</h5>
                <span className="desc">{plainTextDescription.substr(0, 100) + "..."}</span>
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
