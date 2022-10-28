import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Register() {
  const [fName, setFName] = useState();
  const [lName, setLName] = useState();
  const [email, setEmail] = useState();
  const [DOB, setDOB] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  return (
    <div>
      Register
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>First Name </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            value={fName}
            onChange={(e) => {
              setFName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            value={lName}
            onChange={(e) => {
              setLName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter E-Mail Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter DOB"
            value={DOB}
            onChange={(e) => {
              setDOB(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button type="submit">Register</Button>
      </Form>{" "}
      {fName}
    </div>
  );
}
