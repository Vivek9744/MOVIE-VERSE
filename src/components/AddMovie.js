import React, { useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from "firebase/firestore";
import { moviesRef } from "../firebase/firebase";
import swal from 'sweetalert';

const AddMovie = () => {
  const [form, setForm] = useState({
    title: "",
    year: "",
    description: "",
    image: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        // Trigger the addMovie function when Enter key is pressed
        addMovie();
      }
    };

    // Add event listener for key press
    window.addEventListener('keydown', handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty dependency array to run this effect only once

  const addMovie = async () => {
    setLoading(true);
    await addDoc(moviesRef, form);
    swal({
      title: "Successfully added",
      icon: "success",
      button: false,
      timer: 3000
    });
    setLoading(false);
    setForm({
      title: "",
      year: "",
      description: "",
      image: ""
    });
  };
    return (
    <div>
      <section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto border-4   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
        Add New Movie
      </h1>
      
    </div>
    <div className="lg:w-1/2 md:w-2/3 mx-auto">
      <div className="flex flex-wrap -m-2">
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="title" className="leading-7 text-sm text-red-600">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={(e)=>setForm({...form,title:e.target.value})}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
       
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="year" className="leading-7 text-sm text-red-600">
              Year
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.year}
              onChange={(e)=>setForm({...form,year:e.target.value})}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="image" className="leading-7 text-sm text-red-600">
              Image
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={form.image}
              onChange={(e)=>setForm({...form,image:e.target.value})}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="p-2 w-full">
        
          <div className="relative" >
            <label
              htmlFor="description"
              className="leading-7 text-sm text-red-600"
            >
              Description
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              defaultValue={""}
              value={form.description}
              onChange={(e)=>setForm({...form,description:e.target.value})}
            />
          </div>
        </div>
        <div className="p-2 w-full">
          <button  onClick={addMovie}className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
           {loading? <TailSpin height={25} color="white"/>:'Submit'} 
          </button>
        </div>
        
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default AddMovie
