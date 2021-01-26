import React from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import formatDate from "../utils/dateFormatter";
import "./PostSummaryCard.css";

const HomePostSummaryCard = ({ post }) => {
  return (
    <Card className="text-left my-3 shadow mb-5 bg-white rounded">
      <div className="row">
        <div className="col-7">
          <div className="m-2">
            <div>
              <Link to={`/post/${post.id}`}>
                <h4 className="text-truncate">{post.title}</h4>
              </Link>
            </div>
            <p>{post.previewText}</p>
            <div className="row">
              <div className="col">
                <p>Published: {formatDate(post.publishDateTime)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-5">
          <img
            src={post.imageLocation}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </Card>
  );
};

export default HomePostSummaryCard;
