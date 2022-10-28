import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <div>
      Login
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter e-mail"
            value={email}
            onChange={(e) => {
              console.log("IN");
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              console.log("IN");
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
      </Form>
      <Button variant="secondary">
        Forgot Password
      </Button>
      <Button className="ms-2" variant="success">
        Log In
      </Button>
    </div>
  );
}
