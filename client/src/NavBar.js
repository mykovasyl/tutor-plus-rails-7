import React, { useContext } from "react";
import { UserContext } from "./App";
import { Link } from "react-router-dom";
import { Button, Container, Navbar, Row } from "react-bootstrap";
import { Nav } from "react-bootstrap";

function NavBar() {
  const linkStyling = { color: "white", whiteSpace: "nowrap" };
  const { currentUser, handleLogOut } = useContext(UserContext);

  function tutorLinks() {
    return (
      <Nav>
        <Nav.Link as={Link} to='/students' style={linkStyling}>
          Students
        </Nav.Link>
        <Nav.Link as={Link} to='/findstudents' style={linkStyling}>
          Find Students
        </Nav.Link>
      </Nav>
    );
  }

  function studentLinks() {
    return (
      <Nav>
        <Nav.Link as={Link} to='/assignments' style={linkStyling}>
          Assignments
        </Nav.Link>
      </Nav>
    );
  }

  return (
    <Row>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand
          as={Link}
          to='/'
          style={{ marginLeft: "25px", color: "white" }}
        >
          Tutor Plus
        </Navbar.Brand>
        {/* check if tutor or student, display proper links */}
        {currentUser.type === "Tutor"
          ? tutorLinks()
          : currentUser.type === "Student"
          ? studentLinks()
          : null}
        {/* check if logged in, display proper buttons */}
        <Container
          className='justify-content-end'
          style={{ marginRight: "13px" }}
        >
          {currentUser.type ? (
            <>
              <Nav.Link
                as={Link}
                to='/profile'
                style={{ ...linkStyling, marginRight: "10px" }}
              >
                <Button variant='outline-info'>
                  <div style={{ fontWeight: "bold" }}>Profile</div>
                </Button>
              </Nav.Link>
              <Button variant='outline-danger' onClick={handleLogOut}>
                <div style={{ fontWeight: "bold" }}>Log out</div>
              </Button>
            </>
          ) : (
            <>
              <Nav.Link
                as={Link}
                to='/login'
                style={{ ...linkStyling, marginRight: "10px" }}
              >
                <Button variant='outline-primary'>
                  <div style={{ fontWeight: "bold" }}>Log in</div>
                </Button>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to='/signup'
                style={{ ...linkStyling, marginRight: "10px" }}
              >
                <Button variant='outline-warning'>
                  <div style={{ fontWeight: "bold" }}>Sign up</div>
                </Button>
              </Nav.Link>
            </>
          )}
        </Container>
      </Navbar>
    </Row>
  );
}

export default NavBar;
