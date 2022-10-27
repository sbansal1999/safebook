import React from "react";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import NavLoggedIn from "./NavLoggedIn";

export default function Post() {
  return (
    <>
      <NavLoggedIn />
      <div className="d-flex justify-content-center w-100">
        <Card className="mt-3 ml-4" style={{ width: "50rem" }}>
          <div className="d-flex flex-column">
            <Card.Title className="mt-3">Create a Post</Card.Title>
            <Card.Subtitle className="mt-2 text-muted mb-3">
              Share about your day here!
            </Card.Subtitle>
            <Form className="m-2">
              <Form.Label>Enter text here.</Form.Label>
              <Form.Control as="textarea" rows={8} />

              <Form.Label className="mt-2">Upload Images and Videos</Form.Label>
            </Form>
          </div>
        </Card>
      </div>
    </>
  );
}
