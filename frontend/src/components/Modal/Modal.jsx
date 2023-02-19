import React from "react";
import "./Modal.scss";

const Modal = ({ title, body, onConfirm, onCancel, item }) => {
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
            {body} <span className="fw-bold">{item} ?</span>
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
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
