import jwtDecode from "jwt-decode";
import React, { useRef } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { Button } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { Form, Link } from "react-router-dom";

const CourseUpload = () => {
  const [video, setVideo] = useState(null);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const nameRef = useRef();
  const priceRef = useRef();
  const shortDescr = useRef();
  const longDescr = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("video", video);
    formData.append("email", decoded.email);
    formData.append("courseName", nameRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("shortDescription", shortDescr.current.value);
    formData.append("longDescription", longDescr.current.value);

    const res = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data.filename);
  };

  const onChange = (e) => {
    setVideo(e.target.files[0]);
  };

  return (
    <div>
      <div className="bg-light shadow text-center p-2 fs-2 mb-4">
        <p>Upload a course</p>
      </div>
      <div className="row">
        <form onSubmit={onSubmit}>
          <div className="col-md-6">
            <input type="file" onChange={onChange} />
          </div>

          <div className="col-md-6">
            <div class="form-floating mb-3">
              <input
                ref={nameRef}
                type="text"
                class="form-control"
                id="floatingName"
                placeholder="Name"
                autoFocus
              />
              <label for="floatingName">Name</label>
            </div>

            <div class="form-floating mb-3">
              <input
                ref={priceRef}
                type="text"
                class="form-control"
                id="floatingPrice"
                placeholder="Price"
              />
              <label for="floatingPrice">Price</label>
            </div>

            <div class="form-floating mb-3">
              <input
                ref={shortDescr}
                type="text"
                class="form-control"
                id="floatingDescription"
                placeholder="Description"
              />
              <label for="floatingDescription">Short Description</label>
            </div>
            <div class="form-floating mb-3">
              <input
                ref={longDescr}
                type="text"
                class="form-control"
                id="floatingDescription"
                placeholder="Description"
              />
              <label for="floatingDescription">Long Description</label>
            </div>

            <Button
              className="btn btn-lg btn-primary mb-3"
              variant="primary"
              type="submit"
            >
              Create A Course
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseUpload;
