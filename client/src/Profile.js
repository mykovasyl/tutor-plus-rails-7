import React, { useState, useContext } from "react";
import { UserContext } from "./App";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
// import Button from "react-bootstrap/Button";
import { Container, Form, Button } from "react-bootstrap";

function Profile() {
  const { currentUser, setCurrentUser, setStudents, avatar } =
    useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleEdit() {
    setEditing(!editing);
    setFormData({
      name: currentUser.name,
      subjects: currentUser.subjects,
      headline: currentUser.headline,
    });
  }

  function handleDelete() {
    fetch(`/users/${currentUser.id}`, {
      method: "DELETE",
    });
    setCurrentUser({});
    setStudents([]);
    navigate("/");
  }

  function handleUpdate() {
    setEditing(!editing);
    fetch(`/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setFormData({});
      });
  }

  function tableDataOrInputs() {
    if (!editing) {
      return (
        <Container>
          <p>{currentUser.name}</p>
          <img
            style={{ height: "128px", width: "128px" }}
            src={
              avatar
                ? avatar
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="user's avatar"
          />
          <br />
          <p style={{ marginTop: "16px" }}>{currentUser.subjects}</p>
          <p>{currentUser.headline}</p>
          <br />
          <p>
            <Button
              variant='warning'
              onClick={handleEdit}
              style={{ marginRight: "16px" }}
            >
              Edit Profile
            </Button>
            <Button variant='danger' onClick={handleDelete}>
              Delete Account
            </Button>
          </p>
        </Container>
      );
    } else {
      return (
        <Container style={{ width: "30%" }}>
          <Form.Control
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            style={{ marginBottom: "8px" }}
          ></Form.Control>

          {currentUser.type === "Tutor" ? (
            <>
              <Form.Control
                type='text'
                name='subjects'
                value={formData.subjects}
                onChange={handleChange}
                style={{ marginBottom: "8px" }}
              ></Form.Control>
              <Form.Control
                as='textarea'
                rows={3}
                name='headline'
                value={formData.headline}
                onChange={handleChange}
                style={{ marginBottom: "8px" }}
              ></Form.Control>
            </>
          ) : null}

          <Button variant='success' onClick={handleUpdate}>
            <FaCheck />
          </Button>
        </Container>
      );
    }
  }

  return (
    <Container
      style={{
        marginTop: "24px",
        padding: "24px",
        border: ".5px solid grey",
        borderRadius: "8px",
        width: "75%",
      }}
    >
      <h2
        style={{
          border: ".5px solid grey",
          marginBottom: "24px",
          borderRadius: "8px",
          padding: "8px",
        }}
      >
        Profile
      </h2>
      <br />
      {tableDataOrInputs()}
    </Container>
  );
}

export default Profile;
