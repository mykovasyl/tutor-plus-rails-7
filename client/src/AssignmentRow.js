import React, { useState, useContext } from "react";
import { UserContext } from "./App";
import { FaTrashAlt, FaCheck } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";
import FileButton from "./FileButton";

function AssignmentRow({
  id,
  name,
  subject,
  notes,
  tutorId,
  studentId,
  setStudents,
  tutor,
  fileUrl,
}) {
  const { currentUser } = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: name,
    subject: subject,
    notes: notes,
    fileUrl: fileUrl,
  });

  function handleDelete(id) {
    fetch(`/assignments/${id}`, {
      method: "DELETE",
    }).then((resp) => {
      if (!resp.ok) {
        resp.json().then((err) => {
          setErrors(err.error);
        });
      } else {
        setStudents((prevStudents) => {
          const newStudents = prevStudents.map((student) => {
            if (student.id === studentId) {
              student.assignments = student.assignments.filter(
                (assignment) => assignment.id !== id
              );
            }
            return student;
          });
          return newStudents;
        });
      }
    });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleUpdate() {
    setEditing(!editing);
    fetch(`/assignments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((updatedChore) => {
        console.log(updatedChore);
        setFormData({ ...formData, updatedChore });
      });
  }

  function tableDataOrInputs() {
    if (!editing) {
      return (
        <>
          <td>{formData.name}</td>
          <td>{formData.subject}</td>
          <td>{formData.notes}</td>
          <td>
            <FileButton fileUrl={formData.fileUrl} />
          </td>
          {currentUser.type === "Student" ? <td>{tutor}</td> : null}
          <td>
            {currentUser.id === tutorId ? (
              <Button variant='danger'>
                <FaTrashAlt onClick={() => handleDelete(id)} />
              </Button>
            ) : null}
            <p>{errors}</p>
          </td>
        </>
      );
    } else {
      return (
        <>
          <td>
            <Form.Control
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
            ></Form.Control>
          </td>
          <td>
            <Form.Control
              type='text'
              name='subjects'
              value={formData.subject}
              onChange={handleChange}
            ></Form.Control>
          </td>
          <td>
            <Form.Control
              type='text'
              name='notes'
              value={formData.notes}
              onChange={handleChange}
            ></Form.Control>
          </td>
          <td>
            <Button variant='success' onClick={handleUpdate}>
              <FaCheck />
            </Button>
          </td>
        </>
      );
    }
  }

  return <tr>{tableDataOrInputs()}</tr>;
}

export default AssignmentRow;
