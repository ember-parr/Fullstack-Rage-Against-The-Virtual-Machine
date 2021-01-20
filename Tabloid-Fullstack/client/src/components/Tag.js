import React, { useState } from "react";

import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const Tag = ({ tag, deleteTag }) => {
  const [pendingDelete, setPendingDelete] = useState(false);

  const handleDelete = () => {
    deleteTag(tag.id);
    setPendingDelete(false);
  };

  return (
    <div className="justify-content-between row">
      <>
        <div className="p-1">{tag.name}</div>
        <ButtonGroup size="sm">
          <Button
            className="btn btn-danger"
            onClick={(e) => setPendingDelete(true)}
          >
            Delete
          </Button>
        </ButtonGroup>
      </>
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
