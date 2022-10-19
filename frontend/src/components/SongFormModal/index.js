import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SongForm from './SongForm';

function SongFormModal({formType, song, style}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
      className={style}
      onClick={() => {setShowModal(true);}}>{formType === 'editSong'? 'Update':'Upload your own'}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SongForm formType={formType} song={song}/>
        </Modal>
      )}
      </>
  );
}

export default SongFormModal;
