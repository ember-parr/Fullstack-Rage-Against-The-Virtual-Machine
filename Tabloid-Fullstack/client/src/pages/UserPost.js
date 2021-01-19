import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";

export const UserPost = () => {
  const [posts, setPosts] = useState([]);

  //get the current user id fom local stroage
  const currentUser = JSON.parse(localStorage.getItem("userProfile")).id;

  //get all posts
  useEffect(() => {
    return fetch(`/api/post/getbyuser/${currentUser}`)
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, []);

  return (
    <>
      <h1>My Posts</h1>
      <div className="row">
        <div className="col-lg-2 col-xs-12"></div>
        <div className="col-lg-10 col-xs-12">
          <PostList posts={posts} />
        </div>
      </div>
    </>
  );
};
