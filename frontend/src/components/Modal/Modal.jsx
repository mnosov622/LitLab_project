import React, { useEffect, useState } from "react";
import "./Modal.scss";

const Modal = ({
  title,
  body,
  onConfirm,
  onCancel,
  item,
  editUser,
  name,
  email,
  id,
}) => {
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

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
  }, [editUser, id]);
  const handleSave = (id) => {
    const updatedUser = { name: userName, email: userEmail };

    fetch(`http://localhost:8000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    }).then((res) => {
      console.log(res);
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
            {body}{" "}
            <span className={editUser ? "d-none" : `fw-bold`}>{item} ?</span>
            {editUser && (
              <>
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </>
            )}
            {editUser && (
              <input
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
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
                className="btn btn-danger"
                onClick={() => handleSave(userData._id)}
              >
                Save
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
