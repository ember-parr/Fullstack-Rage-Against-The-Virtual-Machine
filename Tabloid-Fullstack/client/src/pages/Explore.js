import React, { useEffect, useState, useContext } from "react";
import PostList from "../components/PostList";
import { UserProfileContext } from "../providers/UserProfileProvider";

const Explore = () => {
  const [posts, setPosts] = useState([]);
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

  return (
    <div className="row">
      <div className="col-lg-2 col-xs-12"></div>
      <div className="col-lg-10 col-xs-12">
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default Explore;
