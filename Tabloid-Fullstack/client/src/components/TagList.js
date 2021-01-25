import React, { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider"
import {
  ListGroup,
  ListGroupItem,
  Input,
  InputGroup,
  Button,
} from "reactstrap";
import Tag from "./Tag"

const TagList = () => {
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(0);
    const { getToken } = useContext(UserProfileContext);
    const [newTag, setNewTag] = useState("");

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

    useEffect(() => {
      getTags();
    }, []);

    const saveNewTag = () => {
      const tagToAdd = { name: newTag };
      getToken().then((token) =>
        fetch("/api/tag", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(tagToAdd),
        }).then(() => {
          setNewTag("");
          getTags();
        })
      );
    };

    const deleteTag = (id) => {
      getToken().then(token =>
        fetch(`/api/tag/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(getTags)
      )
    }

    return (
      <div onClick={(e) => {
        if(e.target.id !== "saveEditBtn" && e.target.id !== "editBtn" && e.target.id !== "editInput"){
          setSelectedTag(0)
        }
      }} className="container mt-5">
        <img
          height="100"
          src="/quill.png"
          alt="Quill Logo"
          className="bg-danger rounded-circle"
        />
        <h1>Tag Management</h1>
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-8 col-md-6">
            <ListGroup>
              {tags.map((tag) => (
                <ListGroupItem key={tag.id}>
                  <Tag tag={tag} deleteTag={deleteTag} setSelectedTag={setSelectedTag} selectedTag={selectedTag} />
                </ListGroupItem>
              ))}
            </ListGroup>
            <div className="my-4">
              <InputGroup>
                <Input
                  required
                  onSelect={(e) => setSelectedTag(0)}
                  onChange={(e) => setNewTag(e.target.value)}
                  value={newTag}
                  placeholder="Add a new tag"
                  maxLength="50"
                />
                <Button id="saveBtn" onClick={saveNewTag}>Save</Button>
              </InputGroup>
            </div>
          </div>
        </div>
      </div>
    );
};

export default TagList;