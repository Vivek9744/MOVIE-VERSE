import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import AddMovie from './AddMovie'
import {Link } from 'react-router-dom';
// import { red } from '@mui/material/colors';
const Header = () => {
  return (
    <div className='text-3xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500'>
      <span>Filmy<span className='text-white'>Verse</span></span>
     <Link to ={'/addmovie'}> <h1 className='text-lg text-white cursor-pointer flex items-center'>
      <Button variant=""><AddIcon className='mr-1' style={{color:'red'}} />Add New</Button>
      

     </h1>
     </Link> 
    </div>
  )
}

export default Header
