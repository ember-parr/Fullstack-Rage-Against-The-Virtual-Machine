import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import PostList from "../components/PostList";
import { UserProfileContext } from "../providers/UserProfileProvider";

const PostsByUser = () => {
    const [posts, setPosts] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const { userId } = useParams();
    
    
    

  //get posts by user ID
    useEffect(() => {
        getToken().then((token) =>
        fetch(`/api/post/getbyuser/${userId}`, {
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
            <h3>Post By {posts[0]?.authorName}</h3>
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