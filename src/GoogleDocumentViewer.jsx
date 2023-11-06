
import React, { useState } from 'react';
import AssistantModal from './AssistantModal';
import './GoogleDocumentViewer.css';

const GoogleDocumentViewer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentURL, setDocumentURL] = useState('https://docs.google.com/gview?url=https://drive.google.com/uc?id=1Pn2X3Aa5vBjf9vQq8Qp4VlRjQo7YyNqs&embedded=true');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const viewDocument = (url) => {
    setDocumentURL(url);
  };

  return (
    <div className="viewer-container">
      <iframe src={documentURL} width="100%" height="100%" title="Google Document Viewer" />
      <button className="button-74" onClick={toggleModal}>Asystent</button>
      <AssistantModal isOpen={isModalOpen} toggleModal={toggleModal} viewDocument={viewDocument} />
    </div>
  );
};

export default GoogleDocumentViewer;
