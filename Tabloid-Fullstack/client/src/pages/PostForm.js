import React from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";

export const PostForm = () => {
  return (
    <div className="container border border-dark mt-5">
      <Form className="p-5">
        <h2>Create A New Post</h2>
        <FormGroup row>
          <Label for="title" sm={2}>
            Title
          </Label>
          <Col sm={10}>
            <Input type="text" name="title" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="title" sm={2}>
            Sub-Title
          </Label>
          <Col sm={10}>
            <Input type="text" name="subTitle" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>
            Category
          </Label>
          <Col sm={10}>
            <Input type="select" name="category">
              <option></option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="title" sm={2}>
            Publishing Date
          </Label>
          <Col sm={10}>
            <Input type="date" name="publishingDate" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleFile" sm={2}>
            Header Image
          </Label>
          <Col sm={10}>
            <Input type="file" name="file" id="exampleFile" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="body" sm={2}>
            Body
          </Label>
          <Col sm={10}>
            <Input type="textarea" name="body" />
          </Col>
        </FormGroup>
        <Button className="float-right">Submit</Button>
      </Form>
    </div>
  );
};
