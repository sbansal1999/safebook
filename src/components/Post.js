import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import NavLoggedIn from "./NavLoggedIn";
import EmojiPicker from "emoji-picker-react";
import Button from "react-bootstrap/Button";
import { Alert, Modal, ModalBody, Spinner } from "react-bootstrap";

import { FcCheckmark } from "react-icons/fc";

import { storage, db } from "./firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import { useCookies } from "react-cookie";

const toxicity = require("@tensorflow-models/toxicity");

export default function Post() {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);

  const [postText, setPostText] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [noContentAlert, setNoContentAlert] = useState(false);
  const [uid, setUid] = useState(cookies.userId);
  const [postResponse, setPostResponse] = useState();
  const [showStatus, setShowStatus] = useState(false);
  const [showToxicWarning, setShowToxicWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setPostText(postText + emojiData.emoji);
  };

  const handleFileAdd = (e) => {
    setNoContentAlert(false);
    const temp = e.target.files;
    const filesArr = Array.prototype.slice.call(temp);
    setFiles((current) => [...current, filesArr]);

    console.log(files.length);
  };

  const handlePost = () => {
    if (postText === "" && files.length === 0) {
      setNoContentAlert(true);
    } else setShowModal(true);
  };

  const uploadFiles = async (id) => {
    const newRef = doc(db, "posts", cookies.userId, "posts", id);
    console.log(id);
    await files.map((file) => {
      const storageRef = ref(storage, `/post/media/${uid}/${file[0].name}`);
      uploadBytes(storageRef, file[0]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          await updateDoc(newRef, { images: arrayUnion(url) });
        });
      });
    });
  };

  const isTextToxic = async () => {
    const threshold = 0.5;
    var isToxic = false;
    const model = await toxicity.load(threshold);
    const sentences = [postText];
    const predictions = await model.classify(sentences);
    await predictions.map((res) => {
      if (res.results[0].match === true) {
        isToxic = true;
      }
    });
    if (isToxic === true) {
      setPostResponse(true);
      setShowToxicWarning(true);
      return true;
    } else return false;
  };

  const isImageToxic = () => {
    return false;
  };

  const createPost = async () => {
    console.log(await isTextToxic());
    if ((await isTextToxic()) === false) {
      if (isImageToxic() === false) {
        // now it is safe to post do it.
        console.log("in");
        setShowStatus(false);
        const postCollectionRef = collection(
          db,
          `posts`,
          cookies.userId,
          `posts`
        );

        const res = await addDoc(postCollectionRef, {
          timestamp: Date.now(),
          postText: postText,
          likes: 0,
          imageCount: files.length,
          images: [],
          uid: cookies.userId,
        });
        uploadFiles(res._key.path.segments[3]);
        setShowSuccess(true);
      }
    }
  };

  const handleConfirmPost = () => {
    if (uid === "") setUid(cookies.userId);
    setPostResponse(false);
    setShowModal(false);
    setShowStatus(true);
    createPost();
  };

  return (
    <>
      <NavLoggedIn />
      <div className="d-flex nav-fix">
        <div
          className="d-flex justify-content-center w-100"
          style={{ marginLeft: "250px" }}
        >
          <div>
            <Card className="mt-3 ml-4" style={{ width: "50rem" }}>
              <div className="d-flex flex-column">
                <Card.Title className="mt-3">Create a Post</Card.Title>
                <Card.Subtitle className="mt-2 text-muted mb-3">
                  Share about your day here!
                </Card.Subtitle>
                <Form className="m-2">
                  <div className="d-flex flex-column">
                    <Form.Label>Enter text here.</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={8}
                      value={postText}
                      onChange={(e) => {
                        if (e.target.value !== "") setNoContentAlert(false);
                        setPostText(e.target.value);
                        setShowPicker(false);
                      }}
                    />

                    <div className="d-flex justify-content-end ">
                      <Button
                        variant={showPicker ? "danger" : "warning"}
                        title="Action"
                        id="segmented-button"
                        className="mt-3"
                        onClick={() => {
                          setShowPicker((showPicker) => {
                            return !showPicker;
                          });
                        }}
                      >
                        Emojis
                      </Button>
                    </div>
                    <Form.Label className="mt-2">
                      Upload Images and Videos <br />
                      (upto 5 images/videos)
                    </Form.Label>
                    <div className="d-flex ">
                      <Form.Control
                        className="mb-3"
                        type="file"
                        onChange={handleFileAdd}
                        accept=".gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .svg, .bmp, .mp4, .mov"
                      />
                      {/* <Button
                        style={{
                          height: "40px",
                          marginLeft: "1%",
                          paddingBottom: "1%",
                        }}
                      >
                        <XLg />
                      </Button> */}
                    </div>
                    {files.length >= 1 && (
                      <div className="d-flex ">
                        <Form.Control
                          className="mb-3"
                          type="file"
                          onChange={handleFileAdd}
                          accept=".gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .svg, .bmp, .mp4, .mov"
                        />
                      </div>
                    )}
                    {files.length >= 2 && (
                      <Form.Control
                        className="mb-3"
                        type="file"
                        onChange={handleFileAdd}
                        accept=".gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .svg, .bmp, .mp4, .mov"
                      />
                    )}
                    {files.length >= 3 && (
                      <Form.Control
                        className="mb-3"
                        type="file"
                        onChange={handleFileAdd}
                        accept=".gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .svg, .bmp, .mp4, .mov"
                      />
                    )}
                    {files.length >= 4 && (
                      <Form.Control
                        className="mb-3"
                        type="file"
                        onChange={handleFileAdd}
                        accept=".gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .svg, .bmp, .mp4, .mov"
                      />
                    )}
                  </div>
                  <Button
                    className="mb-3"
                    variant="primary"
                    onClick={handlePost}
                  >
                    Post
                  </Button>
                </Form>
              </div>
            </Card>

            {noContentAlert && (
              <Alert className="mt-3" variant="danger">
                The post has no content. Please add some content and try again.
              </Alert>
            )}
          </div>
        </div>
        <div style={{ width: "500px" }}>
          {showPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>

      <Modal
        centered
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>Confirm Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Press YES to make the post. NO to cancel the post.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setShowModal(false);
            }}
          >
            No
          </Button>
          <Button onClick={handleConfirmPost}>Yes</Button>
        </Modal.Footer>
      </Modal>

      <Modal centered show={showStatus}>
        <Modal.Header>
          <Modal.Title>Posting !!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center full-w">
            {!postResponse && (
              <div>
                <div className="d-flex justify-content-center">
                  <p>Your post is being uploaded.</p>
                </div>
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              </div>
            )}
            {showToxicWarning && (
              <Alert variant="danger">
                The post had content which is against our policies. Hence it
                won't be posted.
              </Alert>
            )}
          </div>
        </Modal.Body>
        {showToxicWarning && (
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                setShowStatus(false);
                setPostResponse(true);
                setShowToxicWarning(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        )}
      </Modal>

      <Modal show={showSuccess} centered animation={false}>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <h1>Successfully Posted !!!</h1>
          </div>
          <div className="d-flex justify-content-center">
            <h1>
              <FcCheckmark />
            </h1>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowSuccess(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
