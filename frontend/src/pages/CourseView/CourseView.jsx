import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { Oval } from "react-loader-spinner";
import { Tabs, Tab } from "react-bootstrap";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CourseView.scss";
import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import jwtDecode from "jwt-decode";

firebase.initializeApp({
  apiKey: "AIzaSyBqxPkGhgTnyDyTIl_FolvL2QJlJUuG_14",
  authDomain: "litlab-chat.firebaseapp.com",
  projectId: "litlab-chat",
  storageBucket: "litlab-chat.appspot.com",
  messagingSenderId: "790318006402",
  appId: "1:790318006402:web:8ea027078cf1a73e49749b",
});

const firestore = firebase.firestore();

const CourseView = () => {
  const { id } = useParams();
  const [isFinished, setIsFinished] = useState(false);
  const videoRef = useRef(null);
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fakeVideo, setFakeVideo] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState(false);

  // for note
  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState(null);
  const [noteBody, setNoteBody] = useState("");

  //chat
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userName = decoded.name;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    await messagesRef.add({
      text: formValue,
      createdAt: now,
      timeString: timeString,
      userName: userName,
    });

    setFormValue("");

    console.log("messageref", messagesRef);
    setFormValue("");
    // dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleNoteClick = (note) => {
    setNoteId(note.id);
    setNoteBody(note.body);
  };

  const handleAddNoteClick = () => {
    setNoteId(null);
    setNoteBody("");
  };

  const handleNoteSave = () => {
    const newNote = { id: noteId || Date.now(), body: noteBody };
    const newNotes = [
      ...notes.filter((note) => note.id !== newNote.id),
      newNote,
    ];
    setNotes(newNotes);
    setNoteId(null);
    setNoteBody("");
  };

  const handleNoteDelete = () => {
    const newNotes = notes.filter((note) => note.id !== noteId);
    setNotes(newNotes);
    setNoteId(null);
    setNoteBody("");
  };

  //

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/courses/${Number(id)}`)
      .then((response) => response.json())
      .then((data) => {
        setCourseData(data.course);
        setLoading(false);
        console.log("data", courseData);
      });
  }, []);

  useEffect(() => {
    const videoSourceLink = courseData?.video?.startsWith("https");
    console.log("source true", videoSourceLink);
    if (videoSourceLink) {
      setFakeVideo(true);
    } else {
      setUploadedVideo(true);
    }
    //   ? courseData
    //   : `http://localhost:8000/images/${courseData.video}`;
    // setVideoSource(videoSource);
  }, [courseData]);

  const handleEnded = () => {
    setIsFinished(true);
    console.log("video is done");
  };

  useEffect(() => {
    window.addEventListener("message", (e) => {
      console.log("data", e.data);
      if (e.data === "videoEnded") {
        handleEnded();
        console.log("vide endede");
      }
    });
    return () => {
      window.removeEventListener("message", handleEnded);
    };
  }, []);

  return (
    <div className={loading && "bottom"}>
      {loading ? (
        <Oval
          height={80}
          width={80}
          color="#0d6efd"
          wrapperStyle={{ position: "absolute", left: "50%", top: "40%" }}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#0d6efd"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      ) : (
        <>
          <div className="bg-light shadow text-center p-2 fs-2 mb-4">
            <p>
              {courseData?.name}
              &nbsp;&nbsp;<i className="bi bi-person-video3"></i>
            </p>
          </div>
          <div className="row mb-5">
            <div className="col-md-6">
              {fakeVideo ? (
                <iframe
                  ref={videoRef}
                  width="560"
                  height="315"
                  title="video"
                  src={courseData && courseData?.video}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                uploadedVideo &&
                courseData?.video && (
                  <video
                    src={`http://localhost:8000/videos/${courseData.video}`}
                    controls
                    width={"100%"}
                  />
                )
              )}

              <p className="fs-5 text-center mt-3">
                Once you watch the course, you will be able to do a test &nbsp;
                <i className="bi bi-chevron-double-down"></i>
              </p>

              <Link
                to={`/test/${courseData?.id}`}
                className={`btn btn-primary btn-lg d-block mx-auto w-50`}
              >
                Complete test
              </Link>
            </div>
            <div className="col-md-6">
              <Tabs id="my-tabs" className="col-md-6">
                <Tab eventKey="content" title="Content">
                  <div className="col-md-6">
                    <p className="fs-1 text-center ">Course Content</p>
                    {courseData?.courseContent &&
                      courseData?.courseContent.map((content, index) => (
                        <p key={index} className="week">
                          <h3 className="text-primary">Week {index + 1}</h3>
                          <ul>
                            {content.week.map((week, i) => (
                              <li key={i} className="week-item">
                                {week}
                              </li>
                            ))}
                          </ul>
                        </p>
                      ))}
                  </div>
                </Tab>
                <Tab eventKey="chat" title="Notes">
                  <Container className="my-3">
                    <Row>
                      <Col>
                        <h1>Notes</h1>
                      </Col>
                      <Col className="justify-content-left">
                        <Button onClick={handleAddNoteClick}>Add Note</Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8}>
                        <h6>{noteId ? "Edit Note" : "Add Note"}</h6>
                        <ReactQuill
                          value={noteBody}
                          onChange={(value) => setNoteBody(value)}
                          className="noteBody"
                        />
                        <div className="text-end mt-3">
                          {noteId && (
                            <Button
                              className="me-2"
                              variant="danger"
                              onClick={handleNoteDelete}
                            >
                              Delete
                            </Button>
                          )}
                          <Button
                            className="btnSave"
                            variant="primary"
                            onClick={handleNoteSave}
                          >
                            Save
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <h3>Notes List</h3>
                        {notes.map((note) => (
                          <div
                            key={note.id}
                            className="my-3 p-3 border"
                            onClick={() => handleNoteClick(note)}
                          >
                            <div
                              dangerouslySetInnerHTML={{ __html: note.body }}
                            ></div>
                          </div>
                        ))}
                      </Col>
                    </Row>
                  </Container>
                </Tab>
                <Tab eventKey="notes" title="Chat">
                  <div className="chat-window">
                    {messages &&
                      messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                      ))}

                    <span ref={dummy}></span>
                  </div>

                  <form onSubmit={sendMessage}>
                    <div className="input-wrapper">
                      <input
                        className="message-input form-control"
                        value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                        placeholder="say something nice"
                      />

                      <button
                        className="submit-btn btn"
                        type="submit"
                        disabled={!formValue}
                      >
                        🕊️
                      </button>
                    </div>
                  </form>
                </Tab>
              </Tabs>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function ChatMessage(props) {
  const { text, uid, photoURL, createdAt, timeString, userName } =
    props.message;

  console.log("timestirn", timeString);

  const messageDate = createdAt && createdAt.toDate().toLocaleString();
  const dateObj = new Date(messageDate);
  const timeStr = dateObj.toLocaleTimeString([], { hour12: false });
  console.log("message data1", messageDate);

  console.log(timeStr);
  return (
    <>
      <div className={`message`}>
        <img src={"https://api.adorable.io/avatars/23/abott@adorable.png"} />
        <span className="text-message">{text}</span>
        <span className="divider">-</span>
        <span className="username">{userName}</span>
        <p>{timeString}</p>
      </div>
    </>
  );
}

export default CourseView;
