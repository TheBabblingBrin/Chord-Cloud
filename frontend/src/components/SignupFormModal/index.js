import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal({location}) {
  const [showModal, setShowModal] = useState(false);
  const text = location? location:'Create Account'

  return (
    <div className="banner-signup">
      <button id="signup-button" onClick={() => setShowModal(true)}>{text}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm location={location}/>
        </Modal>
      )}
    </div>
  );
}

export default SignupFormModal;
