import React from 'react'
import { Link } from 'react-router-dom';

export const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?q=80&w=676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1920px-Uber_logo_2018.png?_=20180913054426"
          alt=""
          className="w-16 ml-8"
        />
        <div className="bg-white py-4 px-4 pb-7">
          <h2 className="text-2xl font-bold">Get Started with Uber</h2>
          <Link to='/login' className="flex items-center justify-center bg-black text-white py-3 w-full rounded mt-5">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
