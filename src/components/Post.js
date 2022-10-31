import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import NavLoggedIn from "./NavLoggedIn";
import EmojiPicker from "emoji-picker-react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";

export default function Post() {
  const [postText, setPostText] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setPostText(postText + emojiData.emoji);
  };

  const handleFileAdd = (e) => {
    const temp = e.target.files;
    const filesArr = Array.prototype.slice.call(temp);
    setFiles((current) => [...current, filesArr]);

    console.log(files.length);
  };

  const handlePost = () => {
    setShowModal(true);
  };

  const handleConfirmPost = () => {
    setShowModal(false);
  };

  return (
    <>
      <NavLoggedIn />
      <div className="d-flex">
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
    </>
  );
}
