import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import NavLoggedIn from "./NavLoggedIn";
import { Table } from "react-bootstrap";

export default function Profile() {
  const [pic, setPic] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [name, setName] = useState("Tanya Nistha Verma");
  const [age, setAge] = useState(12);
  const [friends, setFriends] = useState([
    "Kamalpreet Kaur",
    "Vipul Singh",
    "Satyam Bansal",
    "Kamalpreet Kaur",
    "Vipul Singh",
    "Satyam Bansal",
    "Kamalpreet Kaur",
    "Vipul Singh",
    "Satyam Bansal",
    "Kamalpreet Kaur",
    "Vipul Singh",
    "Satyam Bansal",
    "Kamalpreet Kaur",
    "Vipul Singh",
    "Satyam Bansal",
    "Kamalpreet Kaur",
    "Vipul Singh",
    "Satyam Bansal",
    "Kamalpreet Kaur",
    "Vipul Singh",
    "Satyam Bansal",
    "Kamalpreet Kaur",
    "Vipul Singh",
    "Satyam Bansal",
  ]);
  const [show, setShow] = useState(false);
  return (
    <div>
      <NavLoggedIn />
      <Card style={{ width: "20rem" }}>
        <Card.Img variant="top" src={pic} width="400" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            Age: {age} <br /> Friends: {friends.length}
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              if (show === true) setShow(false);
              else setShow(true);
            }}
          >
            Show Friends
          </Button>
          <br/>
          <Button className="mt-3" variant="success">
            Show Media
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Friends</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Table responsive striped bordered hover className="mt-3">
            <tbody>
              {friends.map((friend) => {
                return (
                  <tr>
                    <td>profile pic</td>

                    <td>{friend}</td>

                    <td>
                      <Button variant="primary" onClick={() => {}}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          class="bi bi-chat-right"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <tbody></tbody>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
