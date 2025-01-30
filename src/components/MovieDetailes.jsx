import React, { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";

const MovieDetailes = () => {
  const { info } = useSelector((state) => state.movie);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, []);
  console.log(info);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
        backgroundPosition: "top ",
        backgroundSize: "cover",
      }}
      className="w-screen h-screen px-[10%]"
    >
      {/* Part 1 Navigation */}
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

      {/* Part 2 Poster and detailes */}
      <div className="w-full  flex">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] w-[28vh] h-[40vh] object-cover"
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
      </div>

      {/* Part 3 Platforms */}
      <div className="w-[80%]">
        <div className="mt-5">
          {info.watchproviders && info.watchproviders.flatrate && (
            <div className="flex gap-x-4 items-center">
              <h1 className="text-[25px] text-white font-semibold">Available to watch on:</h1>
              {info.watchproviders.flatrate.map((w, index) => (
                <img
                  key={index}
                  className="w-[4vh] h-[4vh] object-cover rounded-lg"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}
          <br />

          {info.watchproviders && info.watchproviders.rent && (
            <div className="flex gap-x-4 items-center">
              <h1 className="text-[25px] text-white font-semibold">Available on rent:</h1>
              {info.watchproviders.rent.map((w, index) => (
                <img
                  key={index}
                  className="mt-1 w-[4vh] h-[4vh] object-cover rounded-lg"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetailes;
