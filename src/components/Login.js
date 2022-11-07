import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavBar from "./NavBar";
import { auth } from "./firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [cookies, setCookie] = useCookies(["userId"]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alertMessage, setAlert] = useState("");
  const [alertVariant, setalertVariant] = useState("danger");

  const setAlertDanger = (msg) => {
    setalertVariant("danger");
    setAlert(msg);
  };
  const navigate = useNavigate();

  

  const handleSignin = () => {
    console.log("sign in");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setalertVariant("success");
        setAlert("User successfully logged in.");
        console.log(user.uid);
        setCookie("userId",user.uid,{maxAge:3000000});
        navigate(`/feed`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setAlertDanger("Invalid Credentials.");
        console.log(errorCode);
      });
  };

  // const logOut = async()=> {
  // await signOut(auth);
  // };
  return (
    <div>
      <NavBar />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter e-mail"
            value={email}
            onChange={(e) => {
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
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
      </Form>
      <Button variant="secondary">Forgot Password</Button>
      <Button className="ms-2" variant="success" onClick={handleSignin}>
        Log In
      </Button>
      {alertMessage && (
        <Alert variant={alertVariant} className="mt-2">
          {alertMessage}
        </Alert>
      )}
    </div>
  );
}
