import React, { useState, useEffect, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import HomePostSummaryCard from "../components/HomePostSummaryCard";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import formatDate from "../utils/dateFormatter";
import { Link } from "react-router-dom";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState({});
  const [users, setUsers] = useState([]);
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

  //get recent users
  useEffect(() => {
    getToken().then((token) =>
      fetch("/api/userprofile/getrecentusers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((users) => {
          setUsers(users);
        })
    );
  }, []);

  useEffect(() => {
    setFeaturedPost(posts[0]);
    const subset = posts.slice(1, 4);
    setFilteredPosts(subset);
  }, [posts]);

  //time pasted function
  function timeSince(date) {
    date = date.split("T")[0];
    var seconds = Math.floor((new Date() - new Date(date)) / 1000);
    var interval = seconds / 31536000;

    if (interval > 1) {
      return `Joined ${Math.floor(interval)} year(s) ago`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `Joined ${Math.floor(interval)} months ago`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `Joined ${Math.floor(interval)} days ago`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return `Joined ${Math.floor(interval)} hours ago`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return `Joined ${Math.floor(interval)} minutes ago`;
    }
    return `Joined ${Math.floor(seconds)} + seconds ago`;
  }

  return (
    <>
      <div className="m-5">
        <div className="row">
          <div className="col-lg-4 col-xs-12">
            <h2>Lastest Post</h2>
            <Card className="shadow mb-5 bg-white rounded">
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
                      <h3 className="text-truncate">{featuredPost?.title}</h3>
                    </Link>
                  </CardTitle>

                  <CardSubtitle
                    className="col-4"
                    className="text-muted align-bottom"
                  >
                    {featuredPost?.publishDateTime
                      ? `Published: ${formatDate(
                          featuredPost?.publishDateTime
                        )} `
                      : ""}
                  </CardSubtitle>
                </div>
                <CardText className="text-left">
                  <p>{featuredPost?.previewText}</p>
                </CardText>
              </CardBody>
            </Card>
          </div>
          <div className="col-lg-5 col-xs-12">
            {filteredPosts?.map((post) => (
              <HomePostSummaryCard post={post} key={post.id} />
            ))}
          </div>
          <div className="col-lg-3 col-xs-12">
            <h2>New Authors</h2>
            {users?.map((user) => {
              return (
                <Card className="my-3 p-4 shadow bg-white rounded">
                  <div className="row">
                    <div className="col-4">
                      <img
                        src={user.imageLocation}
                        style={{ width: "100px" }}
                      />
                    </div>
                    <div className="col-8 text-truncate">
                      <h5>{user.displayName}</h5>
                      <div>{timeSince(user.createDateTime)}</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
