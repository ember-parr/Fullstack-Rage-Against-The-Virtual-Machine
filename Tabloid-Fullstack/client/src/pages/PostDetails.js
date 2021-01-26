import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Jumbotron } from "reactstrap";
import PostReactions from "../components/PostReactions";
import formatDate from "../utils/dateFormatter";
import { Link } from "react-router-dom";
import "./PostDetails.css";
import { CommentForm } from "../components/Comments/CommentForm"
import { CommentList } from "../components/Comments/CommentList"
import { UserProfileContext } from "../providers/UserProfileProvider";
import PostTags from "../components/PostTags"

const PostDetails = () => {
  const { getToken } = useContext(UserProfileContext);
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [reactionCounts, setReactionCounts] = useState([]);
  const [comments, setComments] = useState([]);
  const history = useHistory();

  //get the current user id fom local stroage
  const currentUser = parseInt(
    JSON.parse(localStorage.getItem("userProfile")).id
  );

  // useEffect(() => {
  //   getToken().then((token) =>
  //     fetch(`/api/post/${postId}`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.status === 404) {
  //         history.push("/");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setPost(data.post);
  //       setReactionCounts(data.reactionCounts);
  //       setComments(data.comments)
  //       })
  //   );
  // }, [postId]);


  const getPost = () => {
    getToken().then((token) =>
      fetch(`/api/post/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 404) {
            history.push("/");
          }
          else if (res.status === 401) {
            toast.error("This isn't the post you're looking for");
            return;
          }
          return res.json();
        })
        .then((data) => {
          setPost(data?.post);
          setReactionCounts(data?.reactionCounts);
          setComments(data?.comments)
        })
    );
  }
  useEffect(() => {
    getPost()
  }, [postId]);

  if (!post) return null;

  return (
    <div>
      <Jumbotron
        className="post-details__jumbo"
        style={{ backgroundImage: `url('${post.imageLocation}')` }}
      ></Jumbotron>
      <div className="container">
        <h1>{post.title}</h1>
        <h5 className="text-danger">{post.category.name}</h5>
        <div className="row">
          <div className="col">
            <img
              src={post.userProfile.imageLocation}
              alt={post.userProfile.displayName}
              className="post-details__avatar rounded-circle"
            />
            {/* <a className="d-inline-block" href="/">{post.userProfile.displayName}</a> */}
            <Link to={`/PostsByUser/${post.userProfile.id}`}>{post.userProfile.displayName}</Link>
          </div>
          <div className="col">
            <p>{formatDate(post.publishDateTime)}</p>
          </div>
        </div>
        <div className="text-justify post-details__content">{post.content}</div>
        <div className="my-4">
          <PostReactions postReactions={reactionCounts} getPost={getPost}/>
          <PostTags postId={postId} user={post.userProfile.id}/>
        </div>
        <div>
          {post.userProfileId === currentUser ? (
            <div>
              {" "}
              <Link to={`/edit/post/${post.id}`}>Edit</Link>{" "}
              <Link to={`/delete/post/${post.id}`}>Delete</Link>
            </div>
          ) : (
              ""
            )}
        </div>
        <div className="col float-left my-4 text-left">
          {comments ?
            <div className="col float-left my-4 text-left">
              <CommentForm getPost={getPost} />
              <CommentList postComments={comments} getPost={getPost} />
            </div> : null
          }
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
