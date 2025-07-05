import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/basicModal.css'; // We'll define this below
import BasicPreviewPage from '../previews/pages/BasicPreviewPage';

const BasicModal = (props) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false)
    navigate('/resumeEditor');
  };

  return (
    <div>
      {/* <button onClick={openModal}>Open Pop-up</button> */}

      {(isOpen) && (
        <div className="modal-overlay">
          <div className="modal">
            {/* <button className="modal-close" onClick={closeModal}>
                &times;
            </button> */}
            <BasicPreviewPage isPreview={true}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicModal;
