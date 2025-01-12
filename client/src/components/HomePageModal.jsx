import React, { useEffect, useState } from "react";
// Assuming you have some basic styles for the modal
// import "./styles.css";
import styled from "styled-components";

const ModalOverlay = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
z-index: 1000;
`;

const Modal= styled.div`
background: white;
padding: 20px;
border-radius: 8px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
max-width: 400px;
text-align: center;
`
const ModalButton=styled.button`
margin-top: 10px;
padding: 8px 16px;
background-color: #007bff;
color: white;
border: none;
border-radius: 4px;
cursor: pointer;
&:hover {
    background-color: #0056b3;
  }
`

const HomePageModal = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const lastShownTime = localStorage.getItem("modalLastShown");
    const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
    const currentTime = new Date().getTime();

    if (!lastShownTime || currentTime - lastShownTime > thirtyMinutes) {
      setModalVisible(true);
      localStorage.setItem("modalLastShown", currentTime.toString());
    }
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    isModalVisible && (
      <ModalOverlay>
        <Modal>
          <h2>Notice</h2>
          <p>
          You are currently viewing a demo site, so certain features may not function as intended.
           This is not a complete website and is meant solely for demonstration purposes.
          </p>
          <ModalButton onClick={closeModal}>Close</ModalButton>
          </Modal>
        
        </ModalOverlay>
      
    )
  );
};

export default HomePageModal;
