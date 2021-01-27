import React, { useState, useContext, useEffect } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import {
  Input,
  Row,
  Button,
  Col,
  Badge,
  Card,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";

const PostTags = ({ postId, user }) => {
  const { getToken } = useContext(UserProfileContext);
  const [postTags, setPostTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [newPostTag, setNewPostTag] = useState({
    postId: postId,
    tagId: "",
  });
  const [selected, setSelected] = useState("0");

  //set up pending delete to disable delete button while request is being made

  const getPostTags = () => {
    getToken().then((token) =>
      fetch(`/api/postTag/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // The token gets added to the Authorization header
        },
      })
        .then((resp) => resp.json())
        .then(setPostTags)
    );
  };

  const deletePostTag = (e) => {
    getToken().then((token) =>
      fetch(`/api/postTag/${e.target.parentElement.id}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`,
          },
      })
        .then(_ => {
          getPostTags()
          getTags()
        })
    );
  };

  const getTags = () => {
    getToken().then((token) =>
      fetch(`/api/postTag/available/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // The token gets added to the Authorization header
        },
      })
        .then((resp) => resp.json())
        .then(setTags)
    );
  };

  const updateOnChange = (e) => {
    const postTagCopy = { ...newPostTag };
    postTagCopy.tagId = e.target.value;
    setNewPostTag(postTagCopy);
    setSelected(postTagCopy.tagId)
  };

  const saveNewPostTag = (e) => {
    const postTagToAdd = {
      postId: postId,
      tagId: newPostTag.tagId,
    };
    getToken().then((token) =>
      fetch("/api/postTag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postTagToAdd),
      })
        .then(getPostTags)
        .then(getTags)
        .then((_) => {
          setSelected("0");
        })
    );
  };

  useEffect(() => {
    getPostTags();
    getTags();
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("userProfile")).id;

  return (
    <Row>
      {currentUser === user && (
        <>
          <Col lg={4}>
            <Input
              type="select"
              onChange={updateOnChange}
              value={selected}
            >
              <option value="0" disabled>
                Choose Tag...
              </option>
              {tags?.map((tag) => (
                <option value={tag.id} key={tag.id}>
                  {tag.name}
                </option>
              ))}
            </Input>
          </Col>
          <Col lg={2}>
            <Button color="black" onClick={saveNewPostTag}>
              Add
            </Button>
          </Col>
        </>
      )}
      <Col className="d-flex align-content-start flex-wrap">
        {postTags.map((postTag) => (
            <Card key={postTag.id} color="info" style={{height: "2em"}}className="mx-1 mt-1 rounded-pill d-flex align-items-center text-white">
              <CardBody className="d-flex align-items-center pt-3">
                <CardText>
                  #{postTag.tag.name}
                </CardText>
                <CardTitle>
                {currentUser === user && (<Button id={postTag.id} close onClick={deletePostTag}></Button>)}
                </CardTitle>
              </CardBody>
            </Card>
        ))}
      </Col>
    </Row>
  );
};

export default PostTags;
