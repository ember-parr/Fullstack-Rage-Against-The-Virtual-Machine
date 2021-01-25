import React, { useState, useContext, useEffect } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  Input,
  InputGroup,
} from "reactstrap";

const Tag = ({ tag, deleteTag, selectedTag, setSelectedTag }) => {
  const { getToken } = useContext(UserProfileContext);
  const [isEditing, setIsEditing] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [tagEdits, setTagEdits] = useState("");

  const showEditForm = () => {
    setIsEditing(true);
    setTagEdits(tag.name);
    setSelectedTag(tag.id);
  };

  const hideEditForm = () => {
    setIsEditing(false);
    setTagEdits("");
  };

  const updateTag = () => {
    setIsEditing(true);
    tag.name = tagEdits;
    getToken()
      .then((token) =>
        fetch("api/tag", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tag),
        })
      )
      .then(hideEditForm);
  };

  const handleDelete = () => {
    deleteTag(tag.id);
    setPendingDelete(false);
  };

  useEffect(() => {
    if(tag.id !== selectedTag){
        hideEditForm()
    }
  }, [selectedTag])

  return (
    <div className="justify-content-between row">
      {isEditing ? (
        <Form className="w-100">
          <InputGroup>
            <Input
              id="editInput"
              size="sm"
              onChange={(e) => setTagEdits(e.target.value)}
              autoFocus
              value={tagEdits}
              maxLength="50"
            />
            <ButtonGroup size="sm">
              <Button id="saveEditBtn" onClick={updateTag}>Save</Button>
              <Button outline color="danger" onClick={hideEditForm}>
                Cancel
              </Button>
            </ButtonGroup>
          </InputGroup>
        </Form>
      ) : (
        <>
          <div className="p-1">{tag.name}</div>
          <ButtonGroup size="sm">
            <Button id="editBtn" className="btn btn-primary" onClick={showEditForm}>
              Edit
            </Button>
            <Button
              className="btn btn-danger"
              onClick={(e) => {
                  setPendingDelete(true)
                }}
            >
              Delete
            </Button>
          </ButtonGroup>
        </>
      )}
      {/* DELETE CONFIRM MODAL */}
      <Modal isOpen={pendingDelete}>
        <ModalHeader>Delete {tag.name}?</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this tag? This action cannot be
          undone.
        </ModalBody>
        <ModalFooter>
          <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
          <Button className="btn btn-outline-danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Tag;
