import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../api/axios';
import Imgslider from "./Imgslider";
import Prodcategory from "./Prodcategory";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <div className="mx-4 mt-4 font-outfit h-[530px] overflow-y-auto 
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-transparent 
        [&::-webkit-scrollbar-thumb]:bg-gray-400/50
        [&::-webkit-scrollbar-thumb]:rounded-full
        dark:[&::-webkit-scrollbar-thumb]:bg-gray-600/50
        hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
        dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-600">
        <div className="flex flex-col gap-2">
          {/* <h1 className="backdrop-blur-md bg-white/10 rounded-xl px-6 py-4 shadow-lg">Homepage</h1> */}
          <div className="flex flex-row gap-4">
            <Prodcategory />
            <Imgslider />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
