import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Appbar = ({ to }) => {
  return (
    <div className="shadow h-14 flex justify-between ">
      <div className="flex flex-col justify-center h-full ml-4">
        <Link to={to}>PayTM App</Link>
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className="rounded-full h-12 w-12  flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center p-5 rounded-full  h-full text-x bg-indigo-300">
            S
          </div>
        </div>
      </div>
    </div>
  );
};
