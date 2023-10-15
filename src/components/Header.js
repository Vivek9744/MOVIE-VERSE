import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import {Appstate}from '../App'
// import AddMovie from './AddMovie'
import {Link } from 'react-router-dom';
// import { red } from '@mui/material/colors';
const Header = () => {
  const useAppstate=useContext(Appstate);
   
  return (
    <div className='text-3xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500 sticky top-0  z-10 bg-black'>
      <Link to='/'><span>Filmy<span className='text-white'>Verse</span></span></Link>
     { 
      useAppstate.login?<Link to="/addmovie">
      <h1 className="text-lg text-white cursor-pointer flex items-center">
      
      <Button variant="">
      <AddIcon className="mr-1" style={{ color: 'red' }} />
      Add New
    </Button>
  </h1>
</Link>:  <Link to="/addmovie">
      <h1 className="text-lg text-white cursor-pointer flex items-center">
      
      <Button variant="">
      <AddIcon className="mr-1" style={{ color: 'red' }} />
      Add New
    </Button>
  </h1>
</Link>}}
      <Link to="/search">
      <h1 className="text-lg text-white cursor-pointer flex items-center">
      
      <Button variant="">
    
      Search
    </Button>
  </h1>
      </Link>

    </div>
  )
}

export default Header
