import React, { useEffect, useState } from "react";
import "./Modal.scss";
import { useAlert, positions } from "react-alert";

const Modal = ({
  title,
  body,
  onConfirm,
  onCancel,
  item,
  editUser,
  editCourse,
  clearCart,
  name,
  email,
  id,
}) => {
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [courseName, setCourseName] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [singleCourse, setSingleCourse] = useState({ name: "", price: "" });

  const alert = useAlert();
  console.log("selected course", item);
  useEffect(() => {
    console.log("id is", id);
    fetch(`http://localhost:8000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setUserEmail(data.email);
        setUserName(data.name);
        console.log("user data", data.name);
      });

    fetch(`http://localhost:8000/courses/${item}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleCourse(data.course);
        setCourseName(data.course.name);
        setCoursePrice(data.course.price);
      });
  }, [editUser, id, item]);

  const handleSave = (id) => {
    const updatedUser = { name: userName, email: userEmail };

    fetch(`http://localhost:8000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    }).then((res) => {
      if (res.status === 200) {
        onCancel();
        alert.success("User is successfully updated", {
          position: positions.BOTTOM_CENTER,
          timeout: 2000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  };

  const handleSaveCourse = (id) => {
    const updatedCourse = {
      name: singleCourse.name,
      price: singleCourse.price,
    };

    fetch(`http://localhost:8000/courses/${Number(id)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updatedCourse }),
    }).then((res) => {
      if (res.status === 200) {
        onCancel();
        alert.success("Course is successfully updated", {
          position: positions.BOTTOM_CENTER,
          timeout: 2000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  };

  return (
    <div
      className="modal"
      tabIndex="-1"
      role="dialog"
      data-backdrop="static"
      data-keyboard="false"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onCancel}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {body}
            <span className={editUser || editCourse ? "d-none" : `fw-bold`}>
              {item} ?
            </span>
            {editUser && (
              <>
                <label htmlFor="name" className="mt-1 mb-1 fw-bold">
                  Name
                </label>
                <input
                  className="form-control mb-3"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </>
            )}
            {editUser && (
              <>
                <label htmlFor="name" className="mt-1 mb-1 fw-bold">
                  Email
                </label>
                <input
                  className="form-control"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </>
            )}
            {editCourse && (
              <>
                <label htmlFor="name" className="mt-1 mb-1 fw-bold">
                  Name
                </label>
                <input
                  id="name"
                  className="form-control"
                  value={singleCourse.name}
                  onChange={(e) =>
                    setSingleCourse({ ...singleCourse, name: e.target.value })
                  }
                />
              </>
            )}
            {editCourse && (
              <>
                <label htmlFor="price" className="mt-1 mb-1 fw-bold">
                  Price
                </label>
                <input
                  id="price"
                  className="form-control"
                  value={singleCourse.price}
                  onChange={(e) =>
                    setSingleCourse({ ...singleCourse, price: e.target.value })
                  }
                />
              </>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={onCancel}
            >
              Cancel
            </button>

            {editUser ? (
              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleSave(userData._id)}
              >
                Save
              </button>
            ) : editCourse ? (
              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleSaveCourse(singleCourse.id)}
              >
                Save
              </button>
            ) : clearCart ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
              >
                Clear
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
