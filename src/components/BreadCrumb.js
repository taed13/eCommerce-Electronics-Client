import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = (props) => {
    const { title, links = [] } = props;
    return (
        <div className="breadcrumb mb-0 py-4">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <p className="text-center mb-0">
                            <Link className="text-dark" to="/">
                                Trang chủ
                            </Link>
                            {links.map((link, index) => (
                                <span key={index}>
                                    &nbsp;/&nbsp;
                                    <Link className="text-dark" to={link.path}>
                                        {link.label}
                                    </Link>
                                </span>
                            ))}
                            &nbsp;/ {title}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreadCrumb;
