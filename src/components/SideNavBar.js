import React from "react";
import { Button, Card, Image, Nav } from "react-bootstrap";
import background_image from "../images/background.jpg";

import { FaUserFriends } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function SideNavBar() {
  const navigate = useNavigate();

  return (
    <div className="m-3">
      <div className="sidenav">
        <Card className="m-3">
          <Card.Body>
            <div className="d-flex align-items-center">
              <Image rounded src={background_image} style={{ width: "20%" }} />
              <div className="d-flex" style={{ marginLeft: "5%" }}>
                <Card.Title>Name Will Come Here</Card.Title>
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
              to="/profile"
              className="no-css d-flex full-width justify-content-center"
            >
              Profile
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
