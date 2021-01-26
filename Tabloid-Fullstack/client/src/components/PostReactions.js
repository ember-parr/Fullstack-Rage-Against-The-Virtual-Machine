import React, { useEffect, useState, useContext } from "react";
import { Badge } from "reactstrap";
import { useParams } from "react-router-dom";
import "./PostReaction.css";
import { UserProfileContext } from "../providers/UserProfileProvider";

const PostReactions = ({ postReactions, getPost }) => {
  const { getCurrentUser, getToken } = useContext(UserProfileContext);
  const [hasReacted, setHasReacted] = useState(false);
  const { postId } = useParams();
  const user = getCurrentUser();

  const addReaction = (e) => {
    let postReactionObj = {
      postId,
      userProfileId: user.id,
      ReactionId: e.target.id,
    };
    return getToken()
      .then((token) => {
        fetch("/api/post/addreaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postReactionObj),
        });
      })
      .then(() => getPost());
  };

  useEffect(() => {
    if(postReactions) {
      return;
    }
  }, []);

  return (
    <div className="float-left">
      {postReactions.map((postReaction) => (
        <div key={postReaction.reaction.id} className="d-inline-block mx-2">
          <Badge
            pill
            id={postReaction.reaction.id}
            className="p-2 border border-dark post-reaction__pill"
            title={postReaction.reaction.name}
            onClick={addReaction}
          >
            {postReaction.reaction.emoji} {postReaction.count}
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default PostReactions;