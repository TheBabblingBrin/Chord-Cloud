import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import SongForm from './SongForm';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSong, getSongById, loadSongs, removeSong} from '../../store/songs';
import SignupForm from '../SignupFormModal';
import { restoreUser } from '../../store/session';
import './SongForm.css'

function SongFormModal({formType, song, style}) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  return (
    <>
      <button
      className={style}
      onClick={() => {
        setShowModal(true)
      }}>{formType === 'editSong'? <i class="fa-solid fa-pen-to-square"></i>:'Upload your own'}</button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SongForm formType={formType} song={song} setShowModal={setShowModal}/>
        </Modal>
      )}
      </>
  );
}

export default SongFormModal;
