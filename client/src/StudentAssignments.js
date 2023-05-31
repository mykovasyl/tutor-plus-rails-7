import React, { useContext } from "react";
import { Container, Table } from "react-bootstrap";
import { UserContext } from "./App";
import AssignmentRow from "./AssignmentRow";

function StudentAssignments() {
  const { currentUser } = useContext(UserContext);

  let assignments = currentUser.assignments.map((assignment) => {
    return (
      <AssignmentRow
        key={assignment.id}
        id={assignment.id}
        name={assignment.name}
        subject={assignment.subject}
        notes={assignment.notes}
        tutor={assignment.tutor.name}
        studentId={assignment.student_id}
        fileUrl={assignment.file_url}
      />
    );
  });

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
        <Table striped hover style={{ marginTop: "24px" }}>
          <thead>
            <tr>
              <td>Name</td>
              <td>Subject</td>
              <td>Notes</td>
              <td>File</td>
              {currentUser.type === "Student" ? (
                <td>Tutor</td>
              ) : (
                <td>Delete</td>
              )}
            </tr>
          </thead>
          <tbody>{assignments}</tbody>
        </Table>
      </Container>
    </>
  );
}

export default StudentAssignments;
