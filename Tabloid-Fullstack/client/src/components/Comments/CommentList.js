import React from "react";
import { CommentCard } from "./Comment";


export const CommentList = ({ getPost, postComments }) => {
    return (
        <div>
            {postComments.map((postComment) => {
                return (
                    <CommentCard key={`comment--${postComment.id}`} comment={postComment} getPost={getPost} />
                )
            })}

        </div>
    );

}