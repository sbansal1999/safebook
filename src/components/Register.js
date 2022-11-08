import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavBar from "./NavBar";
import validator from "validator";
import { differenceInMonths } from "date-fns";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "./firebase-config";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [DOB, setDOB] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlert] = useState("");
  const [onRegister, setOnRegister] = useState(false);
  const [alertVariant, setalertVariant] = useState("danger");
  const [users, setUsers] = useState([]);
  const setAlertDanger = (msg) => {
    setalertVariant("danger");
    setAlert(msg);
  };

  const validateUser = () => {
    var dob = new Date(DOB);
    var dnow = new Date(Date.now());
    const diffm = differenceInMonths(dnow, dob);
    if (!fName.trim()) setAlertDanger("First Name cannot be empty.");
    else if (!lName.trim()) setAlertDanger("Last Name cannot be empty.");
    else if (!email.trim()) setAlertDanger("E-Mail cannot be empty.");
    else if (!validator.isEmail(email))
      setAlertDanger("Please enter valid e-mail address");
    else if (!DOB.trim()) setAlertDanger("Date of Birth cannot be empty.");
    else if (diffm < 120) setAlertDanger("Age cannot be less than 10 years");
    else if (diffm > 192) setAlertDanger("Age cannot be more than 16 years");
    else if (!password.trim()) setAlertDanger("Password cannot be empty.");
    else if (!validator.isStrongPassword(password))
      setAlertDanger("Please enter valid password");
    else if (!confirmPassword.trim())
      setAlertDanger("Confirm Password cannot be empty.");
    else if (confirmPassword !== password)
      setAlertDanger("Passwords must be same");
    else {
      setAlert("");
      return 1;
    }
    return 0;
  };

  const handleRegister = async () => {
    if (validateUser()) {
      try {
        setalertVariant("success");
        setAlert("Registering user......");
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setAlert("User successfully registered.");
        createUser(userCredential.user.uid);
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setalertVariant("danger");
          setAlert("Email address is already registered.");
        } else {
          setAlert("Something went wrong.");
        }
      }
    }
  };

  const createUser = async (uid) => {
    const usersCollectionRef = doc(db, "users", uid);

    await setDoc(usersCollectionRef, {
      fname: fName,
      lname: lName,
      email: email,
      dob: DOB,
      friends: [],
    });
  };

  return (
    <div>
      <NavBar />
      <div
        className="d-flex justify-content-center mt-5"
        style={{ width: "100%" }}
      >
        <Form
          className="border p-5 rounded"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h3>Register</h3>
          <Form.Group className="mb-3 mt-3">
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
          <Button type="submit" onClick={handleRegister}>
            Register
          </Button>

          <br />
          {alertMessage && (
            <Alert variant={alertVariant} className="mt-2">
              {alertMessage}
            </Alert>
          )}
        </Form>
      </div>
    </div>
  );
}
