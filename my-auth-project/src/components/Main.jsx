//import React from 'react';

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="w-full">
      <nav className="w-full h-[70px] bg-[#3bb19b] flex items-center justify-between">
        <h1 className="text-white text-[25px] ml-5">Authentication</h1>
        <button 
          className="border-none outline-none py-3 px-0 bg-white rounded-[20px] w-[120px] font-bold text-sm cursor-pointer mr-5"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Main;