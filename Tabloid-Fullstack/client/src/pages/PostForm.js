import React, { useState, useEffect, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const PostForm = () => {
  const [categories, setCategories] = useState([]);
  const [filteredcategories, setFilteredCategories] = useState([]);
  const [post, setPost] = useState();

  const { postId } = useParams();

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

  //get all caregories
  useEffect(() => {
    fetch("/api/post/getallcategories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  // useEffect(() => {
  //   const subset = categories.filter((c) => c.IsApproved === true);
  //   setFilteredCategories(subset);
  // }, [categories]);

  //add post
  const addPost = (post) => {
    return fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  };

  const handleControlledInputChange = (event) => {
    const newPost = { ...post };
    newPost[event.target.name] = event.target.value;
    setPost(newPost);
  };

  const handleClickNewPost = (event) => {
    if (post.title === "") {
      alert("Please Enter Post Title");
    } else if (post.context === "") {
      alert("Please Enter Post Body");
    } else if (parseInt(post.CategoryId) === 0) {
      alert("Please Enter Post Category");
    } else {
      if (postId) {
        console.log({
          title: post.title,
          content: post.content,
          imageLocation: post.imageLocation,
          publishDateTime: post.publishDateTime,
          IsApproved: false,
          userProfileId: parseInt(user.id),
          categoryId: parseInt(post.categoryId),
        });
      } else {
        addPost({
          title: post.title,
          content: post.content,
          imageLocation: post.imageLocation,
          publishDateTime: post.publishDateTime,
          IsApproved: false,
          userProfileId: parseInt(user.id),
          categoryId: parseInt(post.categoryId),
        }).then(() => history.push("/mypost"));
      }
    }
  };

  return (
    <div className="container border border-dark mt-5">
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
              name="categoryId"
              onChange={handleControlledInputChange}
            >
              <option value="0"></option>
              {categories.map((c) => (
                <option value={c.id}>{c.name}</option>
              ))}
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
