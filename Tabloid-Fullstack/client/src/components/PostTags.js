import React, { useState, useContext, useEffect } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { Form, Input, FormGroup, Label, Button } from 'reactstrap'


const PostTags = ({ postId }) => {
    const { getToken } = useContext(UserProfileContext);
    const { postTags, setPostTags } = useState([]);
    const { tags, setTags } = useState([]);

    const getPostTags = () => {
        getToken().then((token) =>
                fetch(`/api/postTag/${postId}`, {
                  method: "GET",
                  headers: {
                      Authorization: `Bearer ${token}`, // The token gets added to the Authorization header
                  }
              })
              .then(resp => resp.json())
              .then(setPostTags))
      }

      const getTags = () => {
        getToken().then((token) =>
              fetch("/api/tag", {
                  method: "GET",
                  headers: {
                      Authorization: `Bearer ${token}`, // The token gets added to the Authorization header
                  }
              })
              .then(resp => resp.json())
              .then(setTags));
      }

      const saveNewPostTag = (e) => {
        const postTagToAdd = { 
                                postId: postId,
                                tagId: e.target.id
                            };
        getToken().then((token) =>
          fetch("/api/postTag", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(tagToAdd),
          }).then(getPostTags)
          .then(getTags)
        );
      };

      useEffect(() => {
          getPostTags()
          getTags()
      }, [])

      return (
          <Form>
              <FormGroup>
                  <Input type="select" placeholder="Choose Tag...">
                      {tags.map(tag => {
                          <option key={tag.id}>{tag.name}</option>
                      })}
                  </Input>
              </FormGroup>
          </Form>
      )
}

export default PostTags;