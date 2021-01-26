import React, { useEffect, useState, useContext } from "react";
import PostList from "../components/PostList";
import { UserProfileContext } from "../providers/UserProfileProvider";

const PostsByUser = (id) => {
    const [posts, setPosts] = useState([]);
    const { getToken } = useContext(UserProfileContext);

  //get posts by user ID
    useEffect(() => {
        getToken().then((token) =>
        fetch(`/api/post/GetByUser/${id}`, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        .then((res) => res.json())
        .then((data) => {
            setPosts(data);
        })
    );
    }, []);

    return (
    <>
        <h1>That users Posts</h1>
        <div className="row">
            <div className="col-lg-2 col-xs-12"></div>
            <div className="col-lg-10 col-xs-12">
                <PostList posts={posts} />
            </div>
        </div>
    </>
    );
};

export default PostsByUser;