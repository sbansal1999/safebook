import React, { useEffect, useState } from "react";
import { Button, Card, Image } from "react-bootstrap";

import { db } from "./firebase-config";
import { collection, getDoc, doc } from "firebase/firestore";

import profile_image from "./../images/profile.jpg";
import { format } from "date-fns";

import { FcComments, FcDislike, FcLike } from "react-icons/fc";

export default function PostContent({ props }) {
  const userDocRef = doc(db, "users", props.uid);
  const [userName, setUserName] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const postTime = format(new Date(props.timestamp), "dd/MM/yyyy hh:mm a");
  const images = props.images;

  const getUserName = async () => {
    const data = await getDoc(userDocRef);
    const fname = data.data().fname;
    const lname = data.data().lname;
    setUserName(fname + "  " + lname);
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <div className="full-width">
      <Card className="mb-3">
        <Card.Title className="p-3">
          <div className="d-flex align-items-center" style={{ gap: "2%" }}>
            <Image rounded src={profile_image} style={{ width: "7%" }} />
            <div className="d-flex flex-column">
              <div className="d-flex">
                <div>
                  <h4>{userName}</h4>
                </div>
              </div>
              <div className="d-flex">
                <h6 className="text-muted font-italic tiny">{postTime}</h6>
              </div>
            </div>
          </div>
        </Card.Title>
        <Card.Body>
          <div className="d-flex mb-3">{props.postText}</div>

          <div
            className="d-flex justify-content-around mb-3"
            style={{ gap: "2%" }}
          >
            <div>
              <Image
                rounded
                src={images[0]}
                style={{ maxWidth: "100%" }}
                className="border"
              />
            </div>
            <div>
              <Image rounded src={images[1]} style={{ maxWidth: "100%" }} />
            </div>
          </div>
          <div
            className="d-flex justify-content-around mb-3"
            style={{ gap: "2%" }}
          >
            <div>
              <Image rounded src={images[2]} style={{ maxWidth: "100%" }} />
            </div>
            <div>
              <Image rounded src={images[3]} style={{ maxWidth: "100%" }} />
            </div>
          </div>
          <div className="d-flex justify-content-around " style={{ gap: "2%" }}>
            <div>
              <Image rounded src={images[4]} style={{ maxWidth: "100%" }} />
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-around">
            <Button
              variant={isLiked ? "danger" : "outline-danger"}
              onClick={() => {
                setIsLiked(!isLiked);
                setIsDisliked(false);
              }}
            >
              <FcLike />
              Like
            </Button>
            <Button
              variant={isDisliked ? "dark" : "outline-dark"}
              onClick={() => {
                setIsDisliked(!isDisliked);
                setIsLiked(false);
              }}
            >
              <FcDislike />
              Dislike
            </Button>
            {/* <Button variant="outline-primary">
              <FcComments />
              Comment
            </Button> */}
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
