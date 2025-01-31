import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-[100%]  flex overflow-y-hidden mb-5 p-1">
      {data.length > 0 ? data.map((d, i) => (
        <NavLink
          to={`/${d.media_type}/details/${d.id}`}
          key={i}
          className="min-w-[15%] h-[25vh] bg-zinc-900 mr-5 mb-5"
        >
          <img
            className="w-full h-[40%] object-cover"
            src={d.backdrop_path || d.poster_path  ?
              `https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path || "" }`
               : "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"
            }
            alt=""
          />

          <div className="text-white p-3 h-[45%] overflow-y-scroll">
            <h1 className=" text-xl font-semibold ">
              {d.name ||
                d.title ||
                d.original_name ||
                d.original_title ||
                "Untitled"}
            </h1>
            <p className="">
              {d.overview?.slice(0, 50)}...
              <span className="text-zinc-500"> more</span>
            </p>
          </div>
        </NavLink>
      )): <h1 className="text-white text-3xl font-black text-center mt-5">There is nothing to show</h1>}
    </div>
  );
};

export default HorizontalCards;
