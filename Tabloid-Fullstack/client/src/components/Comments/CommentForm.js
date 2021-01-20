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
            <Form>
                <FormGroup row>
                <Input type="text" class="form-control" name="subject" id="subject" placeholder="Comment Subject" onChange={(e) => setSubject(e.target.value)}/>
                <Input type="textarea"  id="content" placeholder="Your Comment..." onChange={(e) => setContent(e.target.value)} required></Input>
                </FormGroup>
            </Form>
        <Card className="mt-2">
            <CardHeader>Add A New Comment</CardHeader>
            <CardBody>
                <Form onSubmit={submit}>
                    {/* <FormGroup>
                        <Label for="subject">Subject</Label>
                        <Input
                            id="subject"
                            type="text"
                            onChange={(e) => setSubject(e.target.value)} />
                    </FormGroup> */}
                    <FormGroup>
                        <Label for="content">Content</Label>
                        <Input type="textarea"
                            id="content"
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter Comment"
                        />

                    </FormGroup>

                    <Button type="submit" color="info" size="sm">
                        SUBMIT
            </Button>
                </Form>
            </CardBody>
        </Card>

        </>
    )

}