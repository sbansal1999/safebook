import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { db } from "./firebase-config";

import profile_image from "./../images/profile.jpg";
import { useCookies } from "react-cookie";

export default function SearchCard({ props }) {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const [isFriend, setIsFriend] = useState(false);

  const checkFriend = async () => {
    const currentUser = cookies.userId;
    const dbRef = collection(db, "users", currentUser, "friends");
    const data = await getDocs(dbRef);

    data.docs.map((doc) => {
      if (doc.data().uid === props.id) setIsFriend(true);
    });
  };

  const handleAddFriend = async () => {
    const currentUser = cookies.userId;
    const dbRef = collection(db, "users", currentUser, "friends");
    await addDoc(dbRef, {
      uid: props.id,
      fname: props.fname,
      lname: props.lname,
    });
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
            <div>
              <Button onClick={() => {
                
              }}>Profile</Button>
            </div>
          </div>
        </div>
      </Card.Title>
    </Card>
  );
}
