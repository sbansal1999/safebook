import React, { useEffect, useState } from "react";

import { db } from "./firebase-config";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

import { useCookies } from "react-cookie";
import { Alert } from "react-bootstrap";
import PostContent from "./PostContent";

export default function FeedContent() {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);

  const [uid, setUid] = useState(cookies.userId);
  const [posts, setPosts] = useState([]);
  const [noPosts, setNoPosts] = useState(false);

  const postsCollectionRef = collection(db, "posts", cookies.userId, "posts");

  useEffect(() => {
    const getPosts = async () => {
      // const data = await getDocs(postsCollectionRef);
      const data = await getDocs(
        query(postsCollectionRef, orderBy("timestamp", "desc"), limit(20))
      );
      if (data.docs.length === 0) {
        setNoPosts(true);
      } else {
        setPosts(
          data.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      }
    };

    getPosts();
  }, []);

  return (
    <div style={{ marginTop: "10vh" }}>
      {noPosts ? (
        <div className="d-flex align-items-center justify-content-center nav-fix">
          <Alert>
            Nothing to show here. Head over to {"  "}
            <Alert.Link href="/post">Create Post</Alert.Link> to get started.
          </Alert>
        </div>
      ) : (
        <div>
          {posts.map((post) => {
            return <PostContent props={post} />;
          })}
        </div>
      )}
    </div>
  );
}
