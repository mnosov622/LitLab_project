import React from "react";
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

  return (
    <div>
      <div className="bg-light shadow text-center p-2 fs-2 mb-4">
        <p>Upload a course</p>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps()}
                  className="shadow"
                  style={{ width: "70%", height: "300px" }}
                >
                  <input {...getInputProps()} />
                  <p className="fs-4 d-flex justify-content-center align-items-center mt-5 p-5 pb-3">
                    Upload a file
                  </p>
                  <div className="upload-icon text-center">
                    <i class="bi bi-upload fs-1"></i>
                  </div>
                  <p></p>
                </div>
              </section>
            )}
          </Dropzone>
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
              <label for="floatingName">Course Name</label>
            </div>

            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingPrice"
                placeholder="Price"
              />
              <label for="floatingPrice">Course Price</label>
            </div>

            <div class="form-floating mb-3">
              <input
                type="name"
                class="form-control"
                id="floatingDescription"
                placeholder="Description"
              />
              <label for="floatingDescription">Course Description</label>
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
