import React, { useEffect, useState, useContext } from "react";
import PostList from "../components/PostList";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const UserPost = () => {
  const [posts, setPosts] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  //get the current user id fom local stroage
  const currentUser = JSON.parse(localStorage.getItem("userProfile")).id;

  //get all current user posts
  useEffect(() => {
    getToken().then((token) =>
      fetch(`/api/post/getbyuser/${currentUser}`, {
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
