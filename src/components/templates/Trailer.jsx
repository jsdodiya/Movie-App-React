import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category]?.info?.videos);

  return (
    <div className="bg-[rgba(0,0,0,0.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center">
      
      
      <NavLink>
        <i
          onClick={() => navigate(-1)}
          className="absolute hover:text-[#6556CD] ri-close-large-fill text-white text-3xl right-[8%] top-[3%]"
        ></i>
      </NavLink>
      {ytvideo?.key ? (
        <ReactPlayer
          height={800}
          width={1400}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
};

export default Trailer;
