import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Image, Modal } from "react-bootstrap";
import FeedContent from "./FeedContent";
import { db } from "./firebase-config";
import NavLoggedIn from "./NavLoggedIn";
import SideNavBar from "./SideNavBar";

import profile_image from "./../images/profile.jpg";
import { useCookies } from "react-cookie";

export default function SearchCard({ props }) {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const [isFriend, setIsFriend] = useState(false);

  const checkFriend = async () => {
    const currentUser = cookies.userId;
    const dbRef = doc(db, "users", currentUser);
    const data = await getDoc(dbRef);

    data.data().friends.map((fid) => {
      if (fid === props.id) setIsFriend(true);
    });
  };

  const handleAddFriend = async () => {
    const currentUser = cookies.userId;
    const dbRef = doc(db, "users", currentUser);
    await updateDoc(dbRef, { friends: arrayUnion(props.id) });
    setIsFriend(true);
  };

  useEffect(() => {
    checkFriend();
  }, []);
  return (
    <Card>
      <Card.Title>
        <div className="d-flex p-2 align-items-center">
          <div style={{ width: "10%" }}>
            <Image rounded src={profile_image} style={{ width: "70%" }} />
          </div>
          <div className="d-flex" style={{ width: "60%" }}>
            <div className="d-flex">
              <div>
                <h4>{props.fname + " " + props.lname}</h4>
              </div>
            </div>
          </div>
          <div
            style={{ width: "30%" }}
            className="d-flex justify-content-around"
          >
            <div>
              <Button variant="warning"> Chat</Button>
            </div>
            <div>
              {isFriend ? (
                <Button variant="danger">Friends</Button>
              ) : (
                <Button
                  variant="success"
                  onClick={() => {
                    handleAddFriend();
                  }}
                >
                  Add Friend
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card.Title>
    </Card>
  );
}
