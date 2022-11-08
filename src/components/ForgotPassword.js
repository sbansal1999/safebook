import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavBar from "./NavBar";
import { auth } from "./firebase-config";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Alert } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleForgot = () => {
    setAlertMessage("Connecting to server...");
    sendPasswordResetEmail(auth, email);
    setTimeout(() => {
      setAlertMessage(
        "If the Email Address was registered with us, you will receive a Password reset E-Mail."
      );
    }, 2000);
  };

  return (
    <div>
      <NavBar />
      <div
        className="d-flex justify-content-center mt-5 mb-3"
        style={{ width: "100%" }}
      >
        <Form
          className="border rounded p-5"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h3>Forgot Password</h3>
          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <Form.Label>Enter E-Mail Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="E-Mail Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Button variant="success" onClick={handleForgot}>
            Submit
          </Button>
        </Form>
      </div>
      <div className="d-flex justify-content-center">
        {alertMessage && (
          <Alert variant="info" className="mt-2">
            {alertMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}
