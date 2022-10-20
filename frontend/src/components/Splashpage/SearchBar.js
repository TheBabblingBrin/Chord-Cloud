import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './index.css'
import SongFormModal from '../SongFormModal';
import SignupFormModal from '../SignupFormModal';

const SearchBar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)


  return (
    <div className='search-div'>
        {!user?.id && (<SignupFormModal location={'Upload your own'}/>)}

        {user?.id &&(<SongFormModal />)}

    </div>
  );
}

export default SearchBar;
