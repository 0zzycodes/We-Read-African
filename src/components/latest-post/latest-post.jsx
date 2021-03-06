import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectAllBlog } from '../../redux/blog/blog.selector';
import { createStructuredSelector } from 'reselect';
import PostPreview from '../post-preview/post-preview';
import CustomHeading from '../custom-heading/custom-heading';
import loader from '../../assets/loader.gif';
import './latest-post.scss';
const LatestPost = ({ allBlog, homepage, line, postpage }) => {
  return (
    <div className="latest-post">
      {line ? (
        <CustomHeading hasLine>Latest Posts</CustomHeading>
      ) : (
        <CustomHeading>Latest Posts</CustomHeading>
      )}
      <div className="container">
        <section className="blog-area section">
          <div className="container ">
            <br />
            <br />
            <div className="output">
              {allBlog ? (
                allBlog
                  .filter((item, index) => index < 9)
                  .map(blog =>
                    postpage ? (
                      <PostPreview postpage key={blog.title} blog_data={blog} />
                    ) : (
                      <PostPreview key={blog.title} blog_data={blog} />
                    )
                  )
              ) : (
                <div className="loader">
                  <img id="loader" src={loader} alt="Loader" />
                  {/* <p className="date">No more posts</p> */}
                </div>
              )}
            </div>
            <div className="prevent">
              {homepage ? (
                <Link to="/blog">
                  <span className="load-more-btn" id="load-more">
                    View All Posts
                  </span>
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </div>
  ); 
};

const mapStateToProps = createStructuredSelector({
  allBlog: selectAllBlog
});

export default connect(mapStateToProps)(LatestPost);
