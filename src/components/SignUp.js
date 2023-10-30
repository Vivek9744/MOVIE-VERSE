import React, { useState, useEffect } from "react";
import { TailSpin } from 'react-loader-spinner';
import { Link } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "../firebase/firebase";
import swal from "sweetalert";
const auth = getAuth();

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    passward: "", // Corrected the spelling here
  });
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  console.log("333333333");

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
        },
      },
      auth
    );
  }

  const requestOtp = () => {
    setLoading(true);
    generateRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        console.log("2222222");
        setOtpSent(true);
        setLoading(false);
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // console.log(error)
        // ...
      });
  };

  return (
    <div>
      {otpSent ? (
        <>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-gray-900">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
              <h2 className="text-4xl font-extrabold text-gray-900">
                Sign Up{" "}
              </h2>
               
              <h2 className="text-3xl font-extrabold text-gray-400">
                OTP Verification
              </h2>
              <form className="mt-6">
                <div>
                  <label className="block text-gray-700">Enter OTP</label>
                  <input
                    type="text"
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                    className="w-full mt-2 py-2 px-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 text-gray-500"
                    placeholder="Enter the 6-digit OTP"
                    maxLength="6"
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                  >
                    Verify OTP
                  </button>
                </div>
              </form>
              <div className="text-gray-900">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="text-blue-500">Sign In</span>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-gray-900">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Sign Up for Movie Enthusiasts
              </h2>
              <form className="mt-6">
                <div>
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full mt-2 py-2 px-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 text-gray-500"
                    placeholder="Choose a username"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700">Phone</label>
                  <input
                    type="number" // Changed type to "number" for phone
                    value={form.mobile}
                    onChange={(e) =>
                      setForm({ ...form, mobile: e.target.value })
                    }
                    className="w-full mt-2 py-2 px-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 text-gray-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    value={form.passward} // Corrected the spelling here
                    onChange={(e) =>
                      setForm({ ...form, passward: e.target.value })
                    } // Corrected the spelling here
                    className="w-full mt-2 py-2 px-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 text-gray-500"
                    placeholder="Create a password"
                  />
                </div>
                <div className="mt-6">
                  <button
                    onClick={requestOtp}
                    type="submit"
                    className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-indigo-200"
                  >
               {loading ? <TailSpin color="white" size={25} /> : "Request OTP"}
                  </button>
                </div>
              </form>

              <div className="text-gray-900">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="text-blue-500">Sign In</span>
                </Link>
              </div>
              <div id="recaptcha-container"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignUp;
