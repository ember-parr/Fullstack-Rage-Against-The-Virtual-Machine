import React, { useState, useEffect, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import HomePostSummaryCard from "./HomePostSummaryCard";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import formatDate from "../utils/dateFormatter";
import { Link } from "react-router-dom";

export const HomepagePost = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState({});
  const { getToken } = useContext(UserProfileContext);

  //get all  posts
  useEffect(() => {
    getToken().then((token) =>
      fetch("/api/post", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((posts) => {
          setPosts(posts);
        })
    );
  }, []);

  useEffect(() => {
    setFeaturedPost(posts[0]);
    const subset = posts.slice(1, 4);
    setFilteredPosts(subset);
  }, [posts]);

  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-xs-12">
          <h3>Lastest Post</h3>
          <Card>
            <img
              top
              width="100%"
              src={featuredPost?.imageLocation}
              alt="lastest post"
            />
            <CardBody>
              <div className="row">
                <CardTitle className="col-8 text-truncate">
                  <Link to={`/post/${featuredPost?.id}`}>
                    <h2 className="text-truncate">{featuredPost?.title}</h2>
                  </Link>
                </CardTitle>
                <CardSubtitle
                  className="col -4"
                  tag="h6"
                  className="mb-2 text-muted"
                >
                  {/* Published: {formatDate(featuredPost?.publishDateTime)} */}
                </CardSubtitle>
              </div>
              <CardText className="text-left">
                <p>{featuredPost?.previewText}</p>
              </CardText>
            </CardBody>
          </Card>
        </div>
        <div className="col-lg-6 col-xs-12">
          {filteredPosts?.map((post) => (
            <HomePostSummaryCard post={post} key={post.id} />
          ))}
        </div>
      </div>
    </>
  );
};
