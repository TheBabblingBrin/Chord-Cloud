import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import { useDispatch } from "react-redux";

import * as sessionActions from "../../store/session";


function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className='modal-box'>
      <button className='banner-login' onClick={() => setShowModal(true)}>Log In</button>
      <button className='banner-login' onClick={() => dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))}>Demo User</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </div>
  );
}

export default LoginFormModal;
