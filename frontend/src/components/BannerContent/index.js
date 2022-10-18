import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllSongs, loadSongs } from '../../store/songs';
import { useState, useEffect } from "react";
import './index.css'


const BannerContent = () => {
  const dispatch = useDispatch()


  return (
    <>
    <div className="banner-screen">

    </div>
    <div className='banner'>
      <div className='banner-text'>
        <h2>What's next in music is first on chordCloud</h2>
        <p>Upload your first track and begin your journey. chordCloud gives <br></br> you space to create, find your fans, and connect with other<br></br> artists.</p>
      </div>

    </div>
    </>
  );
}

export default BannerContent;
