import React from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import formatDate from "../utils/dateFormatter";
import "./PostSummaryCard.css";

const PostSummaryCard = ({ post }) => {
  return (
    <Card className="post-summary__card">
      <div className="row">
        <div className="col-lg-3 col-sm-12">
          <Link to={`/post/${post.id}`}>
            <div
              className="post-summary__img"
              style={{
                backgroundImage: `url(${post.imageLocation})`,
              }}
            ></div>
          </Link>
        </div>
        <div className="col-lg-5 col-sm-12 py-3">
          <div>
            <Link to={`/post/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <strong className="text-danger">{post.category.name}</strong>
          </div>
          <p className="text-justify mx-5">{post.previewText}</p>
        </div>
        <div className="col-lg-4 col-sm-12 mt-2 py-3 text-left">
          {/* <p className="ml-5 text-info">Written by {post.authorName}</p> */}
          <Link className="ml-5 text-info" to={`/PostsByUser/${post.authorId}`}>{post.authorName}</Link>
          <p className="ml-5">
            Published on {formatDate(post.publishDateTime)}
          </p>
          <p className="ml-5">
            {post.readTime} min read
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PostSummaryCard;
