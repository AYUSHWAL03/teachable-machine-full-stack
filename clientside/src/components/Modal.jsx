import React from 'react';
import "./Styles.css";
const Modal = ({ onClose, htmlContent }) => {
  return (
    <div className="modalCss">
      <div className="modal-content">
        <span className="closeContent" onClick={onClose}>&times;</span>
        <h1>Data Insight</h1>
        {htmlContent ? (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        ) : (
            <div>
                <h3>No content to showcase</h3>
                <p>Give proper inputs</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
