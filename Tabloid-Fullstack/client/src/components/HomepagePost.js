import React, { useState, useEffect, useContext } from "react";

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
};
