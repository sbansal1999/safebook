import React, { useEffect, useState } from "react";
import { Button, Card, Image, Table } from "react-bootstrap";
import { useCookies } from "react-cookie";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "./firebase-config";

import { Link, useNavigate } from "react-router-dom";

import profile_image from "./../images/profile.jpg";

import Modal from "react-bootstrap/Modal";

import { BsChatRightFill } from "react-icons/bs";

function SideNavBar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [friends, setFriends] = useState([]);
  const [show, setShow] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);

  const getFriends = async () => {
    const dbRef = collection(db, "users", cookies.userId, "friends");
    const newData = await getDocs(dbRef);

    newData.docs.map((doc) => {
      setFriends((prev) => [...prev, doc.data()]);
    });
  };

  useEffect(() => {
    const fetchName = async () => {
      const userDocRef = doc(db, "users", cookies.userId);

      const data = await getDoc(userDocRef);
      const fname = data.data().fname;
      const lname = data.data().lname;
      setUserName(fname + " " + lname);
    };

    fetchName();
    getFriends();
  }, []);

  return (
    <div className="m-3" style={{ height: "100vh" }}>
      <div className="sidenav">
        <Card className="m-3">
          <Card.Body>
            <div className="d-flex align-items-center">
              <Image rounded src={profile_image} style={{ width: "20%" }} />
              <div className="d-flex" style={{ marginLeft: "5%" }}>
                <Card.Title>{userName}</Card.Title>
              </div>
            </div>
          </Card.Body>
        </Card>

        <div className="d-grid m-3">
          <Button
            size="lg"
            className="mb-3"
            variant="primary"
            onClick={() => {
              setShow(true);
            }}
          >
            Friends
          </Button>
          <Button size="lg" className="mb-3" variant="primary">
            <Link
              to={window.location.pathname === "/feed" ? "/profile" : "/feed"}
              className="no-css d-flex full-width justify-content-center"
            >
              {window.location.pathname === "/feed" ? "Profile" : "Feed"}
            </Link>
          </Button>
          <Button size="lg" className="mb-3" variant="primary">
            <Link
              to="/chathome"
              className="no-css d-flex full-width justify-content-center"
            >
              Chat
            </Link>
          </Button>
          <Button size="lg" className="mb-3" variant="primary">
            <Link
              to="/post"
              className="no-css d-flex full-width justify-content-center"
            >
              Post
            </Link>
          </Button>
        </div>
      </div>

      <Modal
        centered
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Friends</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Table responsive striped bordered hover className="mt-3">
            <tbody>
              {friends.map((friend, id) => {
                return (
                  <tr>
                    <td>
                      <div
                        className="d-flex align-items-center"
                        style={{ height: "5vh" }}
                      >
                        <div style={{ width: "20%" }}>
                          <Image
                            rounded
                            src={profile_image}
                            style={{ width: "50%" }}
                          />
                        </div>
                        <div style={{ width: "60%" }}>
                          {friend.fname + " " + friend.lname}
                        </div>
                        <div
                          className="d-flex justify-content-center"
                          style={{ width: "20%" }}
                        >
                          <Button variant="primary" onClick={() => {}}>
                            <BsChatRightFill />
                          </Button>
                        </div>
                      </div>
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

export default SideNavBar;
