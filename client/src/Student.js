import React, { useState } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Table from "react-bootstrap/Table";
import AssignmentRow from "./AssignmentRow";
import { Button, CloseButton, Stack, Row, Col, Table } from "react-bootstrap";

function Student({ student, setStudents }) {
  const [modalShow, setModalShow] = useState(false);

  function handleModalShow() {
    setModalShow(!modalShow);
  }

  let assignmentsInProgress = student.assignments.map((assignment) => {
    return (
      <AssignmentRow
        key={assignment.id}
        setStudents={setStudents}
        id={assignment.id}
        name={assignment.name}
        subject={assignment.subject}
        notes={assignment.notes}
        tutorId={assignment.tutor_id}
        studentId={assignment.student_id}
        fileUrl={assignment.file_url}
      />
    );
  });

  return (
    <div style={{ width: "33.3%", marginBottom: "16px" }}>
      <Button
        variant='outline-dark'
        onClick={handleModalShow}
        style={{
          marginBottom: "8px",
          borderRadius: "8px",
          width: "90%",
          height: "100%",
          boxShadow:
            "rgb(0 0 0 / 3%) 0px -1px 0px 0px, rgb(0 0 0 / 16%) 0px 2px 8px 0px, rgb(0 0 0 / 16%) 0px 10px 8px -5px, rgb(0 0 0 / 16%) 0px 12px 32px -2px",
        }}
        type='button'
      >
        <h2>{student.name}</h2>
        <img
          style={{ height: "128px", width: "128px" }}
          alt='avatar of student'
          src={
            student.avatar
              ? student.avatar
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
        />
      </Button>
      <ReactModal
        isOpen={modalShow}
        onRequestClose={handleModalShow}
        ariaHideApp={false}
      >
        <Row>
          <Stack direction='horizontal'>
            <h2>{student.name}</h2>
            <div className='ms-auto'>
              <CloseButton onClick={handleModalShow} />
            </div>
          </Stack>
        </Row>
        <Link to='/assignwork' state={{ studentId: student.id }}>
          <Button
            type='button'
            variant='outline-primary'
            style={{ marginTop: "8px" }}
          >
            Assign Work
          </Button>
        </Link>
        <div>
          <br></br>
          <Row>
            <Col>
              <h5>Assignments ({student.assignments.length}):</h5>
              <Table striped hover style={{ marginTop: "24px" }}>
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Subject</td>
                    <td>Notes</td>
                    <td>File</td>
                    <td>Delete</td>
                  </tr>
                </thead>
                <tbody>{assignmentsInProgress}</tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </ReactModal>
    </div>
  );
}

export default Student;
