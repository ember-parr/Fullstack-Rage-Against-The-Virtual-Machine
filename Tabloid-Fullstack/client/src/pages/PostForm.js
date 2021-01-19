import React, { useState, useEffect, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const PostForm = () => {
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState();

  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("userProfile"));

  //get post
  useEffect(() => {
    if (post?.id) {
      fetch(`/api/post/${post.id}`).then((data) => {
        setPost(data.post);
      });
    }
  }, []);

  useEffect(() => {
    fetch("/api/post/getallcategories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const handleControlledInputChange = (event) => {
    const newPost = { ...post };
    newPost[event.target.name] = event.target.value;
    setPost(newPost);
  };

  const handleClickNewPost = (event) => {
    console.log({
      title: post.title,
      content: post.content,
      imageLocation: post.imageLocation,
      pubishDateTime: post.publishDateTime,
      IsApproved: false,
      userProfileId: parseInt(user.id),
      categoryId: post.categoryId,
    });
    // .then(() => history.push("/"));
  };

  return (
    <div className="container border border-dark mt-5">
      {console.log(categories)}
      <Form className="p-5">
        <h2>Create A New Post</h2>
        <FormGroup row>
          <Label for="title" sm={2}>
            Title
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="title"
              onChange={handleControlledInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>
            Category
          </Label>
          <Col sm={10}>
            <Input
              type="select"
              name="category"
              onChange={handleControlledInputChange}
            >
              <option value="0"></option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="title" sm={2}>
            Publishing Date
          </Label>
          <Col sm={10}>
            <Input
              type="date"
              name="publishDateTime"
              onChange={handleControlledInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleFile" sm={2}>
            Header Image
          </Label>
          <Col sm={10}>
            <Input
              type="file"
              name="imageLocation"
              onChange={handleControlledInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="content" sm={2}>
            Body
          </Label>
          <Col sm={10}>
            <Input
              type="textarea"
              name="content"
              onChange={handleControlledInputChange}
            />
          </Col>
        </FormGroup>
        <Button className="float-right" onClick={handleClickNewPost}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
