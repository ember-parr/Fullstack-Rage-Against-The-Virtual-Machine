import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Input,
  InputGroup,
  Button,
} from "reactstrap";
import Category from "../components/Category";
import { UserProfileContext } from "../providers/UserProfileProvider";

const CategoryManager = () => {
  const { getToken } = useContext(UserProfileContext);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const history = useHistory();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    getToken().then((token) =>
      fetch(`/api/category`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((categories) => {
          setCategories(categories);
        })
    );
  };

  const saveNewCategory = () => {
    const categoryToAdd = { name: newCategory };
    getToken().then((token) =>
      fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryToAdd),
      }).then(() => {
        setNewCategory("");
        getCategories();
      })
    );
  };

  const deleteCategory = (id) => {
    getToken().then((token) =>
      fetch(`/api/category/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(getCategories)
    );
  };

  return (
    <div className="container mt-5">
      <img
        height="100"
        src="/quill.png"
        alt="Quill Logo"
        className="bg-danger rounded-circle"
      />
      <h1>Category Management</h1>
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-8 col-md-6">
          <ListGroup>
            {categories.map((category) => (
              <ListGroupItem key={category.id}>
                <Category deleteCategory={deleteCategory} category={category} />
              </ListGroupItem>
            ))}
          </ListGroup>
          <div className="my-4">
            <InputGroup>
              <Input
                onChange={(e) => setNewCategory(e.target.value)}
                value={newCategory}
                placeholder="Add a new category"
                maxLength="50"
              />
              <Button onClick={saveNewCategory}>Save</Button>
            </InputGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
