import * as Styled from './styles'
import React from 'react';

const ModalScreen = ({id, modalOpen, setModalOpen, deleteContact}) => {

    const onModalClick = (e) => {
        if(e.target.classList.contains('hsijeF')){
            setModalOpen(false);
        }
    }

     return (
        <Styled.ModalContainer onClick={onModalClick} modalOpen={modalOpen}>

        {/* Modal content  */}
        <Styled.ModalContent>
          <span onClick={() => setModalOpen(false)}>&times;</span>
          <p>Are you sure you want to delete contact?</p>
          <button onClick={() => deleteContact(id)}>Delete</button>
          <button cancel onClick={() => setModalOpen(false)}>Cancel</button>
        </Styled.ModalContent>
      
      </Styled.ModalContainer>
     )
 }

 export default ModalScreen;