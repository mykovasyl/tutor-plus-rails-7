// make into a dashboard for recent updates to assignments

import React, { useContext } from "react";
import { UserContext } from "./App";
import { Link } from "react-router-dom";
import { Container, Nav, Button } from "react-bootstrap";

function Home() {
  const { currentUser } = useContext(UserContext);
  const linkStyling = { color: "white", whiteSpace: "nowrap" };
  return (
    <div>
      <Container
        style={{
          marginTop: "24px",
          padding: "24px",
          border: ".5px solid grey",
          borderRadius: "8px",
          width: "75%",
        }}
      >
        <h1
          style={{
            border: ".5px solid grey",
            marginBottom: "24px",
            borderRadius: "8px",
            padding: "8px",
          }}
        >
          Tutor Plus
        </h1>
        <h3>An application for assigning homework to your students!</h3>
        <p>Upload homework for students to complete.</p>
        {Object.keys(currentUser).length !== 0 ? (
          <>
            <p>Welcome back, {currentUser.name}</p>
          </>
        ) : (
          <>
            <Nav.Link
              as={Link}
              to="/signup"
              style={{ ...linkStyling, marginRight: "10px" }}
            >
              <Button variant="warning">
                <div>Sign up today!</div>
              </Button>
            </Nav.Link>
          </>
        )}
      </Container>
    </div>
  );
}

export default Home;
