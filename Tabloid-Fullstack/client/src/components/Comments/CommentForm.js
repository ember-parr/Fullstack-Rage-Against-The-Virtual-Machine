import React, { useContext, useState, useEffect } from "react";
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
    ButtonGroup
} from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";


export const CommentForm = ({ commentToEdit, getPost, cancelEdit }) => {
    const { getCurrentUser, getToken } = useContext(UserProfileContext)
    const user = getCurrentUser();
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")
    const [isLoading, setIsLoading] = useState(true)

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
        }).then(() => getPost())
    }

    const updateComment = () => {
        return getToken()
            .then((token) => {
                return fetch(`/api/comment/${commentToEdit.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ id: commentToEdit.id, subject: subject, content: content, userProfileId: user.id }),
                })
            }).then(() => {
                cancelEdit();
                getPost();
            })

    }
    const submit = (e) => {
        const comment = {
            subject,
            content,
            postId
        };
        console.log(comment)
        addComment(comment)
    }

    useEffect(() => {
        if (commentToEdit) {
            console.log(getPost)
            return getToken().then((token) => {
                fetch(`/api/comment/${commentToEdit.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}` // The token gets added to the Authorization header
                    }
                }).then(res => res.json())
                    .then(data => {
                        console.log(data)
                        setSubject(data.subject)
                        setContent(data.content)
                        setIsLoading(false)
                    })

            })
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <Card className="mt-2">
            <CardHeader>Add A New Comment</CardHeader>
            <CardBody>
                <Form onSubmit={submit}>
                    <FormGroup>
                        <Label for="subject">Subject</Label>
                        <Input
                            id="subject"
                            type="text"
                            defaultValue={subject}
                            onChange={(e) => setSubject(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">Content</Label>
                        <Input type="textarea"
                            id="content"
                            onChange={(e) => setContent(e.target.value)}
                            defaultValue={content}
                            placeholder="Enter Comment"
                        />

                    </FormGroup>
                    {commentToEdit ? <ButtonGroup size="sm">
                        <Button onClick={updateComment}>
                            Save
              </Button>
                        <Button outline color="danger" onClick={cancelEdit}>
                            Cancel
              </Button>
                    </ButtonGroup> :

                        <Button type="submit" color="info" size="sm">
                            SUBMIT
            </Button>
                    }
                </Form>
            </CardBody>
        </Card>


    )

}