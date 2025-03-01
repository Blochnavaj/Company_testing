import React, { useState } from "react";

function Login() {
  const [currentState, setCurrentState] = useState("login");
  const [userInfo, setUserInfo] = useState({ email: "", password: "" , name : ""});

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const toggleState = () => {
    setCurrentState(currentState === "login" ? "register" : "login");
  };

  const handleClick = async (event) => {
       event.preventDefault();
  }

  return (
    <>
    <form  onSubmit={handleClick} >
    <div className="mt-28">
     <div className=" flex flex-col w-[90%] sm:max-w-96 m-auto items-center gap-6 text-gray-700 bg-white shadow-lg p-8 rounded-xl">
      <h2 className="text-2xl font-bold text-green-500">
        {currentState === "login" ? "Login" : "Register"}
      </h2>
      
      {currentState === "register" && (
             <div className="w-full">
             <input
               type="name"
               name="name"
               value={userInfo.name}
               onChange={handleChange}
               placeholder="Name"
               required
               className="w-full p-3 border outline-none border-gray-300 rounded-lg focus:border-green-500"
             />
           </div>
      )}

      <div className="w-full">
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-3 border outline-none border-gray-300 rounded-lg focus:border-green-500"
        />
      </div>
      <div className="w-full">
        <input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full p-3 border outline-none border-gray-300 rounded-lg focus:border-green-500"
        />
      </div>
      <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold shadow-md">
        {currentState === "login" ? "Login" : "Register"}
      </button>
      <p className="text-sm">
        {currentState === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <span onClick={toggleState} className="text-green-500 cursor-pointer hover:underline">
          {currentState === "login" ? "Register here" : "Login here"}
        </span>
      </p>
    </div>
     </div>
    </form>
    </>
  );
}

export default Login;
