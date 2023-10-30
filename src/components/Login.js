import { Link } from 'react-router-dom';
import React,{useState,useEffect} from 'react'

const Login = () => {
    const [form,setForm]=useState({
        mobile:"",
        passward:""
    })
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-indigo-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-900">Log In</h2>
        <form className="mt-6">
          <div>
            <label className="block text-gray-700">Mobile Number</label>
            <input
              type="Number"
              value={form.mobile}
              onChange={(e)=>setForm({...form,mobile:e.target.value})}
              className="w-full mt-2 py-2 px-3 border border-gray-300 rounded-md focus:ring focus:ring-gray-200 text-gray-500"
              placeholder="Enter your mobile number"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={form.passward}
              onChange={(e)=>setForm({...form,passward:e.target.value})}
              className="w-full mt-2 py-2 px-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 text-gray-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              Log In
            </button>

            <div className="text-gray-900">
              Don't have an account yet?
              <Link to="/signup">
                <span className="text-blue-500">Sign up</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
