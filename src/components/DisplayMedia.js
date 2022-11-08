import React, { useEffect, useState } from "react";

import { db } from "./firebase-config";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

import { useCookies } from "react-cookie";
import { Alert, Image } from "react-bootstrap";
import PostContent from "./PostContent";

function DisplayMedia() {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const [noImages, setNoImages] = useState(true);
  const [imageLinks, setImageLinks] = useState([]);

  const imageCollectionRef = collection(db, "posts", cookies.userId, "posts");

  const getImageLinks = async () => {
    const data = await getDocs(
      query(imageCollectionRef, orderBy("timestamp", "desc"), limit(20))
    );

    if (data.docs.length === 0) {
      setNoImages(true);
    } else {
      data.docs.map((doc) => {
        doc.data().images.map((image) => {
          setNoImages(false);
          console.log(...imageLinks);
          setImageLinks((curr) => [...curr, image]);
        });
      });
    }
  };

  useEffect(() => {
    getImageLinks();
  }, []);

  return (
    <div className="nav-fix">
      {noImages ? (
        <div className="d-flex align-items-center justify-content-center nav-fix">
          <Alert>
            Nothing to show here. Head over to {"  "}
            <Alert.Link href="/post">Create Post</Alert.Link> to get started.
          </Alert>
        </div>
      ) : (
        <div>
          <h3>These are some of your beautiful memories ...</h3>
          {imageLinks.map((image) => {
            return (
              <Image
                rounded
                src={image}
                style={{ width: "40%" }}
                className="p-3 border m-1"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DisplayMedia;
