import React, { memo } from "react";

const QuestionModal = memo((props) => {
  const {
    id,
    header,
    content,
    handleSubmit = () => {},
    handleClose = () => {},
  } = props;
  return (
    <div
      className={"modal fade"}
      id={id}
      data-backdrop="static"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
      aria-expanded="true"
      aria-labelledby={id}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{header}</h5>
          </div>
          <div className="modal-body">{content}</div>
          <div className="modal-footer">
            <button
              id="close-delete-track-modal"
              type="button"
              className="btn"
              data-dismiss="modal"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default QuestionModal;
