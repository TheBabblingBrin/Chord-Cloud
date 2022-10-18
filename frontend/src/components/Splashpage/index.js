import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllSongs, loadSongs } from '../../store/songs';
import { useState, useEffect } from "react";
import { getURL } from '../../store/session';
import SongsIndex from '../SongDisplays/SongIndex';
import BannerContent from '../BannerContent';
import './index.css'
import SearchBar from './SearchBar';
const Splashpage = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getURL())

  },[])

  return (
    <div className='splash-page'>
      <BannerContent/>
      <SearchBar />
      <SongsIndex />
      {/* <TeaserContent/> */}
      {/* <SignUpModule/> */}
    </div>
  );
}

export default Splashpage;
