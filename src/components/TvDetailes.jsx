import React, { useEffect } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import HorizontalCards from "./templates/HorizontalCards";

const TvDetailes = () => {
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.tv);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  console.log(info);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
      className="relative w-screen h-[180vh] px-[10%]"
    >
      {/* Part 1: Navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-2xl">
        <NavLink>
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
        </NavLink>
        <a target="_blank" href={info.details.homepage}>
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          <i className="ri-folder-image-fill"></i>
        </a>
      </nav>

      {/* Part 2: Poster and Details */}
      <div className="w-full flex">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[60vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.details.poster_path ||
            info.details.backdrop_path ||
            info.details.profile_path ||
            info.details.still_path ||
            info.details.file_path ||
            info.details.logo_path ||
            info.details.still
          }`}
          alt=""
        />
        <div className="ml-[5%] w-[70%] flex flex-col gap-y-2 text-white">
          <h1 className="text-5xl font-black text-white">
            {info.details.name ||
              info.details.title ||
              info.details.original_name ||
              info.details.original_title ||
              "Untitled"}
            <small className="text-2xl font-bold text-zinc-200">
              ({info.details.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="mt-2 mb-3 flex gap-x-5 font-medium items-center gap-y-10">
            <span className="text-2xl font-semibold w-[5vh] h-[5vh] flex justify-center items-center bg-yellow-500 rounded-full">
              {(info.details.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="w-[60px] font-semibold text-2xl leading-6">
              User score
            </h1>
            <h1 className="font-medium">{info.details.first_air_date}</h1>
            <h1 className="font-medium">
              {info.details.genres.map((g) => g.name).join(", ")}
            </h1>
            <h1 className="font-medium">{info.details.runtime} min</h1>
          </div>

          <h1 className="text-3xl font-bold italic text-zinc-200">
            {info.details.tagline}
          </h1>

          <h1 className="text-2xl mt-3 mb-0 font-bold">Overview</h1>
          <p className="text-xl italic">{info.details.overview}</p>

          <h1 className="text-2xl mt-3 font-bold">Movie Translated</h1>
          <p className="text-normal font-medium italic">
            {info.translations.slice(0, 20).join(", ")}.
          </p>

          <div className="flex flex-row items-center justify-center text-lg gap-1.5 w-[13%] py-1.5 bg-transparent border-2 rounded-md mt-0 text-white hover:bg-[#6556CD]">
            <i className="ri-play-circle-fill"></i>
            <NavLink className="font-semibold" to={`${pathname}/trailer`}>
              Play Trailer
            </NavLink>
          </div>
        </div>
      </div>

      {/* Part 3: Platforms */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-5">
        {info.watchproviders?.flatrate && (
          <div className="flex gap-x-4 items-center">
            <h1 className="text-[22px] text-white font-semibold">
              Watch Now On:
            </h1>
            {info.watchproviders.flatrate.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-[4vh] h-[4vh] object-cover rounded-lg"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders?.rent?.length > 0 ? (
          <div className="flex gap-x-4 items-center">
            <h1 className="text-[22px] text-white font-semibold">Rent From:</h1>
            {info.watchproviders.rent.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-[4vh] h-[4vh] object-cover rounded-lg"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        ) : (
          <h1 className="text-[22px] text-white font-semibold">
            Platform information not available
          </h1>
        )}

        {info.watchproviders?.buy && (
          <div className="flex gap-x-4 items-center">
            <h1 className="text-[22px] text-white font-semibold">
              Available for Purchase:
            </h1>
            {info.watchproviders.buy.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-[4vh] h-[4vh] object-cover rounded-lg"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4: Seasons */}

      <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-400" />
      <h1 className="text-white text-3xl font-bold mb-2">Seasons</h1>
      <div className="w-[100%] flex overflow-y-hidden">
        {info.details.seasons.length > 0 ? (
          info.details.seasons.map((s) => (
            <div
              className="w-[15vw] mr-5"
              key={s.id || s.name || Math.random()}
            >
              <img
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] min-w-[12vw] h-[30vh] object-cover"
                src={
                  s.poster_path || s.backdrop_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.poster_path || s.backdrop_path
                      }`
                    : "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg" // Path to your fallback image
                }
                alt={s.name || "Default Image"}
              />

              <h1 className="text-zinc-300 text-2xl mt-3 font-semibold">
                {s.name || "Untitled"}
              </h1>
            </div>
          ))
        ) : (
          <h1 className="text-white text-2xl font-semibold">
            No seasons available
          </h1>
        )}
      </div>

      {/* Part 5: Recommendations */}
      <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-400" />
      <h1 className="text-white text-3xl font-bold mb-2">Similar Tv Shows</h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetailes;
