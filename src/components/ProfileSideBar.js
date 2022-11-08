import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import NavLoggedIn from "./NavLoggedIn";
import { Image, Table } from "react-bootstrap";

import profile_image from "./../images/profile.jpg";
import SideNavBar from "./SideNavBar";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useCookies } from "react-cookie";
import { db } from "./firebase-config";
import { differenceInYears, parseISO } from "date-fns";
import FeedContent from "./FeedContent";
import { Link } from "react-router-dom";

import { BsChatRightFill } from "react-icons/bs";

function ProfileSideBar() {
  const [profilePicture, setProfilePicture] = useState(profile_image);
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState();
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

  const getUserData = async () => {
    const userDocRef = doc(db, "users", cookies.userId);
    const data = await getDoc(userDocRef);

    const fname = data.data().fname;
    const lname = data.data().lname;
    setUserName(fname + " " + lname);

    const diff = differenceInYears(Date.now(), parseISO(data.data().dob));
    setAge(diff);
  };

  const getUserName = async (uid) => {
    const userDocRef = doc(db, "users", uid);
    const data = await getDoc(userDocRef);
    return data.data().fname + " " + data.data().fname;
  };

  useEffect(() => {
    getUserData();
    getFriends();
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

export default ProfileSideBar;
