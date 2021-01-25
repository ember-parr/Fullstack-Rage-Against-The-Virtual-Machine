import React, { useState, useEffect } from "react";
import PostList from "./components/PostList";

export const HompagePost = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPost, setFilteredPosts] = useState([]);

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
    const subset = posts.filter((post) => post.isActive).slice(0, 4);
    setFilteredPosts(subset);
  }, [posts]);

  return (
    <>
      <div className="row">
        <div className="col-lg-2 col-xs-12"></div>
        <div className="col-lg-10 col-xs-12">
          <PostList posts={filteredPost} />
        </div>
      </div>
    </>
  );
};
