import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
    CardHeader,
} from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";


export const CommentForm = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")
    const { postId } = useParams()
    const history = useHistory()

    const addComment = (comment) => {
        return getToken().then((token) => {
            fetch('/api/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(comment)
            })
        })
        // .then(res => res.json());
    }


    const submit = (e) => {
        const comment = {
            subject,
            content,
            postId
        };
        console.log(comment)
        addComment(comment)
            .then(() => history.push(`/post/${postId}`))
    }

    return (
        <>
        <h3 class="text-center">Comments</h3>
            <Form class="row g-3" onSubmit={submit}>
            <div class="col-md-12">
                <Input type="text" class="form-control" name="subject" id="subject" placeholder="Comment Subject" onChange={(e) => setSubject(e.target.value)}/>
                </div>
                <br />
                <br/>
                <br />
                    <div class="col-md-10">
                        <Input type="textarea"  id="content" placeholder="Your Comment..." onChange={(e) => setContent(e.target.value)} required></Input>
                        </div>
                        <div class="col-md-2">
                            <Button type="submit" size="md" class="btn btn-secondary"> SUBMIT</Button>
                        </div>
            </Form>
        

        </>
    )

}