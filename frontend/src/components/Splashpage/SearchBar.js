import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './index.css'
import SongFormModal from '../SongFormModal';

const SearchBar = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <div className='search-div'>
        <SongFormModal />
    </div>
  );
}

export default SearchBar;
