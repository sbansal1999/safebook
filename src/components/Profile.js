import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

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
  ]);
  const [show, setShow] = useState(false);
  return (
    
      <div>
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
                if (show == true) setShow(false);
                else setShow(true);
              }}
            >
              Show Friends
            </Button>
            <br />
            <Button className="mt-3" variant="success">
              Show Media
            </Button>
          </Card.Body>
        </Card>
     
    </div>
  );
}
