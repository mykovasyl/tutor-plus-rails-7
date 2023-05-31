import React, { useState, useContext } from "react";
import { UserContext } from "./App";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

function AssignWork() {
  const [error, setError] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { studentId } = location.state;
  const { currentUser, setStudents } = useContext(UserContext);
  const [assignmentData, setAssignmentData] = useState({
    name: "",
    notes: "",
    subject: "",
    tutor_id: currentUser.id,
    student_id: studentId,
  });
  const [file, setFile] = useState(null);

  function handleChange(e) {
    setAssignmentData({ ...assignmentData, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    setFile({ file: e.target.files[0] });
  }

  function onFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    for (let data in assignmentData) {
      formData.append(data, assignmentData[data]);
    }

    if (file !== null) {
      formData.append("file", file.file);
    }

    fetch("/assignments", {
      method: "POST",
      body: formData,
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((newAssignment) => {
          console.log(newAssignment);
          let studentsList = [
            ...new Map(
              newAssignment.tutor.students.map((student) => [
                student["id"],
                student,
              ])
            ).values(),
          ];
          setStudents(studentsList);
          navigate("/students");
        });
      } else {
        resp.json().then((error) => setError(error.errors));
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
        Assignment
      </h2>
      <Form onSubmit={onFormSubmit}>
        <Row>
          <Col>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type='text'
              name='name'
              value={assignmentData.name}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Label>Subject:</Form.Label>
            <Form.Control
              type='text'
              name='subject'
              value={assignmentData.subject}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "16px" }}>
          <Col>
            <Form.Label>Notes:</Form.Label>
            <Form.Control
              as='textarea'
              name='notes'
              value={assignmentData.notes}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "16px" }}>
          <Col>
            <Form.Control type='file' name='file' onChange={handleFileChange} />
          </Col>
        </Row>
        <Row
          style={{
            margin: "16px",
            justifyContent: "center",
          }}
        >
          <Button type='submit' variant='success' style={{ maxWidth: "33%" }}>
            Upload
          </Button>
        </Row>
        {/* {error.map((error) => {
          return <p key={error}>{error}</p>;
        })} */}
      </Form>
    </Container>
  );
}

export default AssignWork;
