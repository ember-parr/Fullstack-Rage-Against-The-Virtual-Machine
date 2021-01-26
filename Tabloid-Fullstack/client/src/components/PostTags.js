import React, { useState, useContext, useEffect } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import {
  Form,
  Input,
  FormGroup,
  Row,
  Button,
  Col,
  Container,
  Badge,
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
      <Col>
        {postTags.map((postTag) => (
          <Badge key={postTag.id} color="primary">
            #{postTag.tag.name}
          </Badge>
        ))}
      </Col>
    </Row>
  );
};

export default PostTags;
