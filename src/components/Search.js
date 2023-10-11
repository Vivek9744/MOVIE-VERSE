import React ,{ useState, useEffect } from 'react'

const Search = () => {
    const [movie,setMovie]=useState("");

    const [query, setQuery]=useState('');

    useEffect(() => {
      fetch(API_URL)
      .then((res)=>res.json())
      .then(data=>{
        console.log(data);
        setMovies(data.results);
      })
    }, [])




    const searchMovie = async(e)=>{
        e.preventDefault();
        console.log("Searching");
        try{
          const url=`https://api.themoviedb.org/3/search/movie?api_key=bcc4ff10c2939665232d75d8bf0ec093&query=${query}`;
          const res= await fetch(url);
          const data= await res.json();
          console.log(data);
          setMovies(data.results);
        }
        catch(e){
          console.log(e);
        }
      }
    // const Searchit=()=>{
        


    //     setMovie("");
    // }
    const changeHandler=(e)=>{
        setQuery(e.target.value);
      }
  return (
    <div>
      <>
 
  <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-12">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-100">
          Search Movie 
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          
        </p>
      </div>
      <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
        <div className="relative flex-grow w-full">
          <label
            htmlFor="Movie Name"
            className="leading-7 text-sm text-gray-600"
          >
            Movie Name
          </label>
          <input
             value={movie}
             onChange={(event)=>setMovie(event.target.value)}
            type="text"
            id="full-name"
            name="full-name"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={Searchit}>
          Search
        </button>
      </div>
    </div>
  </section>
</>

    </div>
  )
}

export default Search
