import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
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
        <div className="flex-[2] flex flex-col items-center justify-center bg-white rounded-l-lg">
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <h1 className="text-4xl mt-0">Login to Your Account</h1>
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
            <button
              type="submit"
              className="border-none outline-none py-3 px-0 bg-[#3bb19b] rounded-[20px] w-[180px] font-bold text-sm cursor-pointer text-white my-2.5"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center bg-[#3bb19b] rounded-r-lg">
          <h1 className="mt-0 text-white text-4xl self-center">New Here ?</h1>
          <Link to="/signup">
            <button
              type="button"
              className="border-none outline-none py-3 px-0 bg-white rounded-[20px] w-[180px] font-bold text-sm cursor-pointer"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;