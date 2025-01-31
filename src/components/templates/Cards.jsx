import React from "react";
import { NavLink } from "react-router-dom";

const Cards = ({ data, title }) => {
  return (
    <div className="w-full h-full px-[5%] flex flex-wrap justify-center items-center bg-[#1F1E24]">
      {data.map((c, i) => (
        <NavLink
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative w-[30vh] mr-[5%] mb-[5%]"
          key={i}
        >
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover"
            src={
              c.poster_path || c.backdrop_path || c.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.poster_path || c.backdrop_path || c.profile_path
                  }`
                : "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"
            }
            alt=""
          />

          <h1 className="text-zinc-300 text-2xl mt-3 font-semibold">
            {c.name ||
              c.title ||
              c.original_name ||
              c.original_title ||
              "Untitled"}
          </h1>

          {c.vote_average ? (
            <div className="absolute right-[2%] bottom-[25%] text-white text-xl font-semibold w-[5vh] h-[5vh] flex justify-center items-center bg-yellow-500 rounded-full">
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          ) : null}
        </NavLink>
      ))}
    </div>
  );
};

export default Cards;
