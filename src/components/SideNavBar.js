import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { useCookies } from "react-cookie";

import { db } from "./firebase-config";

import { Link, useNavigate } from "react-router-dom";

import profile_image from "./../images/profile.jpg";

function SideNavBar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);

  useEffect(() => {
    const fetchName = async () => {
      const userDocRef = doc(db, "users", cookies.userId);

      const data = await getDoc(userDocRef);
      const fname = data.data().fname;
      const lname = data.data().lname;
      setUserName(fname + " " + lname);
    };

    fetchName();
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
          <Button size="lg" className="mb-3" variant="primary">
            <Link
              to="/friends"
              className="no-css d-flex full-width justify-content-center"
            >
              Friends
            </Link>
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
    </div>
  );
}

export default SideNavBar;
