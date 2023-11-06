
import React, { useState } from 'react';
import AssistantModal from './AssistantModal';
import './GoogleDocumentViewer.css';

const GoogleDocumentViewer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentURL, setDocumentURL] = useState('https://docs.google.com/spreadsheets/d/13UAv5jHQlfaqHnn4J9yGBIRm6RRVm-8K3cfucOKDcZg/edit?usp=sharing');

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
