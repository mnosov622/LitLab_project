import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Link, useParams } from "react-router-dom";
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
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  const chatWindowRef = useRef(null);
  const [activeTab, setActiveTab] = useState("content");
  const [chatWindowLoaded, setChatWindowLoaded] = useState(false);

  const handleTabSelect = (tabKey) => {
    if (tabKey === "chat") {
      // Code to execute when the Chat tab is selected
      console.log("Chat tab selected");
    } else if (tabKey === "notes") {
      // Code to execute when the Notes tab is selected
      console.log("Notes tab selected");
    }

    setActiveTab(tabKey);
  };

  useEffect(() => {
    if (activeTab === "chat" && chatWindowRef.current && chatWindowLoaded) {
      console.log("active");
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [activeTab, chatWindowLoaded]);

  const handleChatWindowLoad = () => {
    setChatWindowLoaded(true);
  };

  const handleClick = (icon) => {
    setFormValue((prevValue) => prevValue + icon.icon);
  };

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
  const [savedNotes, setSavedNotes] = useState("");
  const Color = Quill.import("attributors/style/color");
  Quill.register(Color, true);

  const toolbarOptions = [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ size: [] }],
    [{ color: [] }, { background: [] }],
  ];

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  useEffect(() => {
    fetch(`http://localhost:8000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("user data", data);
        setSavedNotes(data.notes);
      });
  }, []);

  //chat
  useEffect(() => {
    const chatWindow = chatWindowRef.current;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, []);

  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState([]);

  const playAudio = () => {};
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

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
    const chatWindow = document.querySelector(".chat-window");
    chatWindow.scrollTo({
      top: chatWindow.scrollHeight,
      behavior: "smooth",
    });
    playAudio();
  };

  const handleAddNoteClick = () => {
    setNoteId(null);
    setNoteBody("");
  };

  const handleNoteSave = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/users/notes/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notebody: noteBody }),
    }).then((res) => {
      fetch(`http://localhost:8000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setSavedNotes(data.notes);
        });
    });

    const newNote = { id: noteId || Date.now(), body: noteBody };
    const newNotes = [
      ...notes.filter((note) => note.id !== newNote.id),
      newNote,
    ];
    setNotes(newNotes);
    setNoteId(null);
    setNoteBody("");
  };

  const handleDeleteNotes = () => {
    console.log("clicked");
    fetch(`http://localhost:8000/users/notes/${userId}`, {
      method: "DELETE",
    }).then((res) => {
      fetch(`http://localhost:8000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("notes", data.notes);
          setSavedNotes(data.notes);
        });
    });
  };
  const handleNoteDelete = () => {
    const newNotes = notes.filter((note) => note.id !== noteId);
    setNotes(newNotes);
    setNoteId(null);
    setNoteBody("");
  };

  const handleDeleteNote = (note) => {
    console.log(note);

    fetch(`http://localhost:8000/users/notes/${userId}/${note.id}`, {
      method: "DELETE",
    }).then((res) => {
      fetch(`http://localhost:8000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setSavedNotes(data.notes);
        });
    });
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

  useEffect(() => {
    const chatWindow = chatWindowRef.current;
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }, [chatWindowRef]);

  const showChat = () => {
    console.log("tab clicked");
  };
  const [emailAddress, setEmailAddress] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log(`Sending email to ${emailAddress}`);
    console.log(`Subject: ${emailSubject}`);
    console.log(`Body: ${emailBody}`);
    // Add logic to send email here
  };

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
            <Link
              to={`/course/${courseData.id}`}
              className="text-underline courseName"
            >
              {courseData?.name}
            </Link>
            &nbsp;&nbsp;<i className="bi bi-person-video3"></i>
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
              <Tabs
                id="my-tabs"
                className="col-md-6"
                activeKey={activeTab}
                onSelect={handleTabSelect}
              >
                <Tab eventKey="content" title="Content">
                  <div className="col-md-6">
                    <p className="fs-1 text-left ">Course Content</p>
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
                <Tab eventKey="notes" title="Notes">
                  <div className="my-3">
                    <Row>
                      <Col>
                        <h1>Notes</h1>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8}>
                        <form action="" onSubmit={(e) => handleNoteSave(e)}>
                          <ReactQuill
                            modules={{ toolbar: toolbarOptions }}
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
                              className="btnSave w-auto"
                              variant="primary"
                              type="submit"
                            >
                              Add
                            </Button>
                          </div>
                        </form>
                      </Col>
                    </Row>
                    <Col md={8}>
                      {savedNotes.length > 0 && (
                        <h3 className="p-0">Notes List</h3>
                      )}

                      {savedNotes &&
                        savedNotes.map((note, index) => (
                          <div className="position-relative">
                            <div
                              key={index}
                              className="border p-3 mb-3 note w-100"
                              dangerouslySetInnerHTML={{ __html: note.text }}
                            ></div>
                            <span
                              className="position-absolute cursor-pointer"
                              onClick={() => handleDeleteNote(note)}
                              style={{
                                right: "5px",
                                bottom: "5px",
                                cursor: "pointer",
                              }}
                            >
                              <i class="bi bi-trash3-fill"></i>
                            </span>
                          </div>
                        ))}
                    </Col>
                    <Col md={8} className="mt-2 d-flex justify-content-end">
                      {savedNotes.length > 0 && (
                        <button
                          className="btn btn-danger deleteBtn w-auto"
                          onClick={handleDeleteNotes}
                        >
                          Delete all notes
                        </button>
                      )}
                    </Col>
                  </div>
                </Tab>
                <Tab
                  eventKey="chat"
                  title="Chat"
                  id="chat-tab"
                  onClick={showChat}
                >
                  <div
                    className="chat-window"
                    ref={chatWindowRef}
                    onLoad={handleChatWindowLoad}
                  >
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
                        <i class="bi bi-send"></i>
                      </button>
                      <div className="icons mt-3">
                        <span onClick={() => handleClick({ icon: "😊" })}>
                          😊
                        </span>
                        <span onClick={() => handleClick({ icon: "😂" })}>
                          😂
                        </span>
                        <span onClick={() => handleClick({ icon: "🤣" })}>
                          🤣
                        </span>
                        <span onClick={() => handleClick({ icon: "😔" })}>
                          😔
                        </span>
                        <span onClick={() => handleClick({ icon: "😢" })}>
                          😢
                        </span>
                        <span onClick={() => handleClick({ icon: "😱" })}>
                          😱
                        </span>
                      </div>
                    </div>
                  </form>
                </Tab>
                <Tab eventKey="email" title="Send Feedback">
                  <div className="my-3">
                    <Row>
                      <Col>
                        <h1>Send Feedback</h1>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8}>
                        <form onSubmit={handleEmailSubmit}>
                          <div className="mb-3">
                            <label
                              htmlFor="emailAddress"
                              className="form-label"
                            >
                              Email Address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="emailAddress"
                              value={emailAddress}
                              onChange={(e) => setEmailAddress(e.target.value)}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="emailSubject"
                              className="form-label"
                            >
                              Your Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="emailSubject"
                              value={emailSubject}
                              onChange={(e) => setEmailSubject(e.target.value)}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="emailBody" className="form-label">
                              Feedback
                            </label>
                            <textarea
                              className="form-control"
                              id="emailBody"
                              value={emailBody}
                              onChange={(e) => setEmailBody(e.target.value)}
                              required
                            />
                          </div>
                          <button type="submit" className="btn btn-primary">
                            Send
                          </button>
                        </form>
                      </Col>
                    </Row>
                  </div>
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

  const messageDate = createdAt && createdAt.toDate().toLocaleString();
  const dateObj = new Date(messageDate);
  const timeStr = dateObj.toLocaleTimeString([], { hour12: false });

  console.log(timeStr);
  return (
    <>
      <div className={`message`}>
        <img src={"https://api.adorable.io/avatars/23/abott@adorable.png"} />
        <span className="text-message">{text}</span>
        <span className="divider">-</span>
        <span className="username">{userName}</span>
        <div className="time">
          <p className="timeString">{timeString}</p>
        </div>
      </div>
    </>
  );
}

export default CourseView;
