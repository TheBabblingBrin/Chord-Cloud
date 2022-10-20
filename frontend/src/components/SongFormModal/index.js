import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SongForm from './SongForm';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSong, getSongById, loadSongs, removeSong} from '../../store/songs';

function SongFormModal({formType, song, style}) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()

  return (
    <>
      <button
      className={style}
      onClick={() => {
        setShowModal(true)
      }}>{formType === 'editSong'? 'Update':'Upload your own'}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SongForm formType={formType} song={song} setShowModal={setShowModal}/>
        </Modal>
      )}
      </>
  );
}

export default SongFormModal;
