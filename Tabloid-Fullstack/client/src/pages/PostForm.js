import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const PostForm = () => {
  const [categories, setCategories] = useState([]);
  const [filteredcategories, setFilteredCategories] = useState([]);
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { postId } = useParams();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("userProfile"));

  //get post
  const getPostbyId = () => {
    fetch(`/api/post/${postId}`)
      .then((res) => {
        if (res.status === 404) {
          return;
        }
        return res.json();
      })
      .then((data) => {
        setPost(data.post);
      });
  };

  useEffect(() => {
    if (postId) {
      getPostbyId();
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [postId]);

  //get categories
  useEffect(() => {
    fetch("/api/post/getallcategories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  //get all active categories
  useEffect(() => {
    const subset = categories.filter((c) => c.isActive === true);
    setFilteredCategories(subset);
  }, [categories]);

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

  //update post
  const updatePost = (post) => {
    return fetch(`/api/post/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  };

  //get info from input fields
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
      setIsLoading(true);
      if (postId) {
        updatePost({
          id: parseInt(postId),
          title: post.title,
          content: post.content,
          imageLocation: post.imageLocation,
          publishDateTime: post.publishDateTime,
          IsApproved: false,
          userProfileId: parseInt(user.id),
          categoryId: parseInt(post.categoryId),
        }).then(() => history.push("/mypost"));
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

  if (post) {
    //the post does not belong to the user
    if (post?.userProfileId !== parseInt(user.id)) {
      return (
        //the post does not belong to the user
        <>
          <h1>This is not your post to edit</h1>
          <Button>
            <Link to={"/mypost"}>Go Back</Link>
          </Button>
        </>
      );
    }
  }

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
              id="postTitle"
              name="title"
              required
              autoFocus
              className="form-control"
              onChange={handleControlledInputChange}
              defaultValue={post?.title}
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
              value={post?.categoryId}
            >
              <option value="0"></option>
              {filteredcategories.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
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
              defaultValue={post?.publishDateTime.split("T")[0]}
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
              defaultValue={post?.imageLocation}
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
              defaultValue={post?.content}
            />
          </Col>
        </FormGroup>
        <Button
          className="float-right"
          disabled={isLoading}
          onClick={(event) => {
            event.preventDefault();
            handleClickNewPost();
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};
