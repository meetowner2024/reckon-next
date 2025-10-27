import React from 'react';

const page = () => {
  return (
    <div className="flex justify-center items-center w-full h-[80vh]  p-6">
      <div className=" rounded-2xl shadow-xl p-10 w-full h-auto max-w-4xl text-center flex flex-col justify-center items-center">
        <div>
          <h1 className="text-5xl font-extrabold text-[#48a5af] mb-4 ">Welcome to Admin Dashboard</h1>
          <p className="text-xl text-[#48a5af] mb-8">Your gateway to seamless administration. Start managing with confidence today.</p>
        </div>
      
      </div>
    </div>
  );
};

export default page;