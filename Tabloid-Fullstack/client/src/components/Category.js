import React, { useState, useContext, useEffect } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import {
  Button,
  ButtonGroup,
  Form,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const Category = ({ category, deleteCategory }) => {
  const { getToken } = useContext(UserProfileContext);
  const [isEditing, setIsEditing] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [categoryEdits, setCategoryEdits] = useState("");

  const showEditForm = () => {
    setIsEditing(true);
    setCategoryEdits(category.name);
  };

  const hideEditForm = () => {
    setIsEditing(false);
    setCategoryEdits("");
  };

  const updateCategory = () => {
    setIsEditing(true);
    category.name = categoryEdits;
    getToken().then(token =>
      fetch("api/category", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
      })
    )
      .then(hideEditForm);
  }

  const handleDelete = () => {
    deleteCategory(category.id)
    setPendingDelete(false)
  }

  return (
    <div className="justify-content-between row">
      {isEditing ? (
        <Form className="w-100">
          <InputGroup>
            <Input
              size="sm"
              onChange={(e) => setCategoryEdits(e.target.value)}
              value={categoryEdits}
            />
            <ButtonGroup size="sm">
              <Button onClick={updateCategory}>Save</Button>
              <Button outline color="danger" onClick={hideEditForm}>
                Cancel
              </Button>
            </ButtonGroup>
          </InputGroup>
        </Form>
      ) : (
          <>
            <div className="p-1">{category.name}</div>
            <ButtonGroup size="sm">
              <Button className="btn btn-primary" onClick={showEditForm}>
                Edit
            </Button>
              <Button
                className="btn btn-danger"
                onClick={(e) => setPendingDelete(true)}
              >
                Delete
            </Button>
            </ButtonGroup>
          </>
        )}
      {/* DELETE CONFIRM MODAL */}
      <Modal isOpen={pendingDelete}>
        <ModalHeader>Delete {category.name}?</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this category? This action cannot be
          undone.
        </ModalBody>
        <ModalFooter>
          <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
          <Button className="btn btn-outline-danger" onClick={handleDelete}>Yes, Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Category;
