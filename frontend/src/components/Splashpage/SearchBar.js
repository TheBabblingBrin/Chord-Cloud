import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './index.css'

const SearchBar = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <div className='search-div'>

        <button
        onClick={()=> history.push("/songs/upload")}>
          Upload your own
        </button>

    </div>
  );
}

export default SearchBar;
