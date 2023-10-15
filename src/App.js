import Header from './components/Header'
import Cards from './components/Cards'
import {Route,Routes} from 'react-router-dom'
import AddMovie from './components/AddMovie'
import Detail from './components/Detail'
import Search from './components/Search'
import Detail2 from './components/Detail2'
import {createContext,useEffect,useState} from "react"

const Appstate=createContext();
function App() {
  consst[login,setLogin]=useState(false);
  const[userName,setUserName]=useState("");
  return (
  <Appstate.Provider value={{login,userName,setLogin,setUserName}}> 

 
          <div className='App '>
      <Header/>
       <Routes>

         <Route path="/" element={ <Cards/>}/>
         <Route path="/addmovie" element={ <AddMovie/>}/>
        <Route path="/details/:id" element={<Detail/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/detail2/:id" element={<Detail2 />}/>

       </Routes>
       </div>
    </Appstate.Provider>
  );
}
 
export default App;
export {Appstate}
