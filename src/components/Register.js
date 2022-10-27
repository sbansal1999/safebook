import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Register() {
  const [name, setName] = useState();
  const [Lname, setLastName] = useState();
  const [email, setEmail] = useState();
  const [date, setDOB] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  return (
    <div>
      Register
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            value={name}
            onChange={(e) => {
              console.log("IN");
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last Name"
            value={Lname}
            onChange={(e) => {
              console.log("IN");
              setLastName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              console.log("IN");
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter DOB"
            value={date}
            onChange={(e) => {
              console.log("IN");
              setDOB(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              console.log("IN");
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => {
              console.log("IN");
              setConfirmPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button type="submit">Register</Button>
      </Form>{" "}
      {name}
    </div>
  );
}
