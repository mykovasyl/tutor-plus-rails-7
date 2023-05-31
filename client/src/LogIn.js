import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { UserContext } from "./App";

function LogIn() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setCurrentUser, setStudents, setErrors } = useContext(UserContext);

  function handleInputChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((loggedInUser) => {
          setCurrentUser(loggedInUser);
          if (loggedInUser.type === "Tutor") {
            // new hash map to get unique students
            let studentsList = [
              ...new Map(
                loggedInUser.students.map((student) => [student["id"], student])
              ).values(),
            ];
            setStudents(studentsList);
            setErrors([]);
          }
          navigate("/");
        });
      } else {
        alert("Invalid username or password");
      }
    });
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
        Log in:
      </h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type='text'
              name='username'
              value={login.username}
              onChange={handleInputChange}
            />
          </Col>
          <Col>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type='password'
              name='password'
              value={login.password}
              onChange={handleInputChange}
            />
          </Col>
        </Row>
        <Button type='submit' variant='success' style={{ margin: "16px" }}>
          Log in!
        </Button>
      </Form>
    </Container>
  );
}

export default LogIn;
