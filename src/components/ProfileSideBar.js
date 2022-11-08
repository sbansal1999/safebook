import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import NavLoggedIn from "./NavLoggedIn";
import { Table } from "react-bootstrap";

import profile_image from "./../images/profile.jpg";
import SideNavBar from "./SideNavBar";
import { doc, getDoc } from "firebase/firestore";
import { useCookies } from "react-cookie";
import { db } from "./firebase-config";
import { differenceInYears, parseISO } from "date-fns";
import FeedContent from "./FeedContent";
import { Link } from "react-router-dom";

function ProfileSideBar() {
  const [profilePicture, setProfilePicture] = useState(profile_image);
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState();
  const [friends, setFriends] = useState([]);
  const [show, setShow] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);

  const getUserData = async () => {
    const userDocRef = doc(db, "users", cookies.userId);
    const data = await getDoc(userDocRef);

    const fname = data.data().fname;
    const lname = data.data().lname;
    setUserName(fname + " " + lname);

    const diff = differenceInYears(Date.now(), parseISO(data.data().dob));
    setAge(diff);

    console.log(data.data().friends.length);
    setFriends(data.data().friends);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div
      className="d-flex align-items-center"
      style={{ height: "100vh", marginLeft: "5%" }}
    >
      <div className="nav-fix">
        <div>
          <Card style={{ width: "20rem" }}>
            <Card.Img variant="top" src={profilePicture} width="400" />
            <Card.Body>
              <Card.Title>{userName}</Card.Title>
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
              <br />
              <Button className="mt-3" variant="success">
                <Link
                  to="/showMedia"
                  className="no-css d-flex full-width justify-content-center"
                >
                  Show Media
                </Link>
              </Button>
            </Card.Body>
          </Card>
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

export default ProfileSideBar;
