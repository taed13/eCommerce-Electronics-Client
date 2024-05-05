import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = () => {
    return (
        <div className="blog-card">
            <div className="card-image">
                <img src="images/blog-1.jpg" className='img-fluid w-100' alt="blog-1" />
            </div>
            <div className="blog-content">
                <p className='date'>14 April, 2024</p>
                <h5 className="title">A Beautiful Sunday Morning Renaissance</h5>
                <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nemo veniam quos, vero inventore!</p>
                <Link to="/blog/:id" className='button'>Read more</Link>
            </div>
        </div>
    )
}

export default BlogCard