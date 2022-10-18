import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SongForm from './SongForm';

function SongFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="banner-signup">
      <button
      className='song-form-button'
      onClick={() => {setShowModal(true);
      console.log('make a song')}}>Upload your own</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SongForm />
        </Modal>
      )}
    </div>
  );
}

export default SongFormModal;
