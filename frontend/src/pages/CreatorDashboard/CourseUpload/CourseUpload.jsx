import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { Button } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { Form, Link } from "react-router-dom";

const CourseUpload = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "video/*",
    onDrop: (acceptedFiles) => {
      // handle the dropped video files
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("video", file);

    // Make a POST request to the Express server to handle the video upload
    fetch("http://localhost/videos", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Video uploaded successfully!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="bg-light shadow text-center p-2 fs-2 mb-4">
        <p>Upload a course</p>
      </div>
      <div className="row">
        <div className="col-md-6">
          <input type="file" onChange={handleFileChange} />
        </div>

        <div className="col-md-6">
          <form>
            <div class="form-floating mb-3">
              <input
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
                type="text"
                class="form-control"
                id="floatingPrice"
                placeholder="Price"
              />
              <label for="floatingPrice">Price</label>
            </div>

            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingDescription"
                placeholder="Description"
              />
              <label for="floatingDescription">Short Description</label>
            </div>
            <div class="form-floating mb-3">
              <input
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseUpload;
