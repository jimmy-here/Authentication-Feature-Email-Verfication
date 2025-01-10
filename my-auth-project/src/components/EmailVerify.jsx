import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Fragment } from "react";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:8080/api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <Fragment>
      {validUrl ? (
        <div className="w-screen h-screen flex items-center justify-center flex-col">
          <img src="/images/success.png" alt="success_img" />
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <button className="border-none outline-none py-3 px-0 bg-[#3bb19b] rounded-[20px] w-[180px] font-bold text-sm cursor-pointer">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default EmailVerify;
