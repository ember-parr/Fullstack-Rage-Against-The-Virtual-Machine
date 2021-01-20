import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
    CardFooter,
} from "reactstrap";

export const CommentList = ({ postComments }) => {
    return (
        <div>
            {postComments.map((postComment) => (
                <Card key={postComment.id} className="mt-2">
                    <CardHeader>{postComment.subject}</CardHeader>
                    <CardBody>
                        {postComment.content}
                    </CardBody>
                    <CardFooter className="row">
                        <Button color="info" size="sm"
                        // onClick={ }
                        >
                            Delete
            </Button>
                        <Button color="info" size="sm"
                        // onClick={ }
                        >
                            Edit
            </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );

}