import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Row } from "react-bootstrap";
import Student from "./Student";
import { UserContext } from "./App";

function FindStudents() {
  const [errors, setErrors] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [filterByName, setFilterByName] = useState("");
  const { setStudents } = useContext(UserContext);

  useEffect(() => {
    fetch("/getstudents").then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          setAllStudents(data);
        });
      } else {
        setErrors(resp.json().errors);
      }
    });
  }, []);

  const filteredStudents = allStudents.filter((student) =>
    student.name.toLowerCase().includes(filterByName.toLowerCase())
  );

  const displayStudents = filteredStudents.map((student) => {
    return (
      <Student key={student.id} student={student} setStudents={setStudents} />
    );
  });

  function handleNameSearch(e) {
    setFilterByName(e.target.value);
  }

  return (
    <>
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
          Find Your Student
        </h2>
        <Container>
          <Form.Control
            type='input'
            placeholder='Search by name'
            onChange={handleNameSearch}
            style={{
              marginBottom: "24px",
              padding: "8px",
            }}
          />
        </Container>
        <Row>{displayStudents}</Row>
        {errors.map((err) => {
          return <div key={err}>{err}</div>;
        })}
      </Container>
    </>
  );
}

export default FindStudents;
