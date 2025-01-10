import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f5f5] flex items-center justify-center">
      <div className="w-[900px] h-[500px] flex rounded-lg shadow-[0px_3px_3px_-2px_rgba(0,0,0,0.2),0px_3px_4px_0px_rgba(0,0,0,0.14),0px_1px_8px_0px_rgba(0,0,0,0.12)]">
        <div className="flex-1 flex flex-col items-center justify-center bg-[#3bb19b] rounded-l-lg">
          <h1 className="mt-0 text-white text-[35px] self-center">Welcome Back</h1>
          <Link to="/login">
            <button type="button" className="border-none outline-none py-3 px-0 bg-white rounded-[20px] w-[180px] font-bold text-sm cursor-pointer">
              Sign in
            </button>
          </Link>
        </div>
        <div className="flex-[2] flex flex-col items-center justify-center bg-white rounded-r-lg">
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <h1 className="text-4xl mt-0">Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className="outline-none border-none w-[370px] p-4 rounded-lg bg-[#edf5f3] my-1 text-sm"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className="outline-none border-none w-[370px] p-4 rounded-lg bg-[#edf5f3] my-1 text-sm"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="outline-none border-none w-[370px] p-4 rounded-lg bg-[#edf5f3] my-1 text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="outline-none border-none w-[370px] p-4 rounded-lg bg-[#edf5f3] my-1 text-sm"
            />
            {error && (
              <div className="w-[370px] p-4 my-1 text-sm bg-[#f34646] text-white rounded-md text-center">
                {error}
              </div>
            )}
            {msg && (
              <div className="w-[370px] p-4 my-1 text-sm bg-[#5cdd5c] text-white rounded-md text-center">
                {msg}
              </div>
            )}
            <button type="submit" className="border-none outline-none py-3 px-0 bg-[#3bb19b] rounded-[20px] w-[180px] font-bold text-sm cursor-pointer text-white my-2.5">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;