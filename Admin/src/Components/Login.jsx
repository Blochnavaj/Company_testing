import React, { useState } from "react";
import axios from 'axios'
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({setToken}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const onSumbitHandler = async (e) => {
    try {
       e.preventDefault();
       const response = await axios.post(backendUrl + '/api/user/admin' ,{email,password})
        if(response.data.success) {
          setToken(response.data.token)
        } else {
           toast.error(response.data.message);
        }
       
    } catch (error) {
       console.log(error)
       toast.error(error.message);

    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>
        <form onSubmit={onSumbitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email}
              type="email" 
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} value={password}
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
       
      </div>
    </div>
  );
};

export default Login;