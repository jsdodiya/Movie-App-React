import React, { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.person);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  if (!info) {
    return <Loading />;
  }

  const { details, externalid } = info;
  const gender = details.gender === 2 ? "Male" : "Female";

  return (
    <div className="px-[15%] h-[160vh] w-screen bg-[#1F1E24]">
      {/* Navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-2xl">
        <NavLink to="#" onClick={() => navigate(-1)}>
          <i className="hover:text-[#6556CD] ri-arrow-left-line"></i>
        </NavLink>
      </nav>

      {/* Image and Data */}
      <div className="w-full flex">
        {/* Left Side - Image and Personal Info */}
        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              details.backdrop_path ||
              details.profile_path ||
              details.still_path ||
              details.file_path ||
              details.logo_path
            }`}
            alt={details.name || "Profile"}
          />
          <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-400" />

          {/* Social Media Links */}
          <div className="text-2xl text-white flex gap-x-6">
            {externalid.wikidata_id && (
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.wikidata.org/wiki/${externalid.wikidata_id}`}
              >
                <i className="ri-external-link-fill"></i>
              </a>
            )}
            {externalid.instagram_id && (
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.instagram.com/${externalid.instagram_id}`}
              >
                <i className="ri-instagram-fill"></i>
              </a>
            )}
            {externalid.facebook_id && (
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.facebook.com/${externalid.facebook_id}`}
              >
                <i className="ri-facebook-fill"></i>
              </a>
            )}
            {externalid.twitter_id && (
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://twitter.com/${externalid.twitter_id}`}
              >
                <i className="ri-twitter-x-fill"></i>
              </a>
            )}
          </div>

          {/* Personal Info */}
          <div>
            <h1 className="text-2xl text-zinc-400 font-semibold my-3">
              Person Info
            </h1>
            <div>
              <h2 className="text-lg text-zinc-400 font-semibold">Known For</h2>
              <p className="text-zinc-400">
                {details.known_for_department || "Unknown"}
              </p>
            </div>
            <div className="mt-3">
              <h2 className="text-lg text-zinc-400 font-semibold">Gender</h2>
              <p className="text-zinc-400">{gender}</p>
            </div>
            <div className="mt-3">
              <h2 className="text-lg text-zinc-400 font-semibold">Birthday</h2>
              <p className="text-zinc-400">{details.birthday || "Unknown"}</p>
            </div>
            <div className="mt-3">
              <h2 className="text-lg text-zinc-400 font-semibold">Deathday</h2>
              <p className="text-zinc-400">
                {details.deathday ? details.deathday : "Still Alive"}
              </p>
            </div>
            <div className="mt-3">
              <h2 className="text-lg text-zinc-400 font-semibold">
                Place of Birth
              </h2>
              <p className="text-zinc-400">
                {details.place_of_birth || "Unknown"}
              </p>
            </div>
            <div className="mt-3">
              <h2 className="text-lg text-zinc-400 font-semibold">
                Also Known As
              </h2>
              <p className="text-zinc-400">
                {details.also_known_as && details.also_known_as.length > 0
                  ? details.also_known_as.join(", ")
                  : "No Other Names"}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Details */}
        <div className="w-[80%] px-6">
          <h1 className="text-6xl text-zinc-400 font-black mb-4">
            {details.name}
          </h1>
          <h2 className="text-xl text-zinc-200 font-semibold mb-3">
            Biography
          </h2>
          <p className="text-zinc-400">
            {details.biography || "No Details Available"}
          </p>
          <h2 className="mt-5 text-lg text-zinc-200 font-semibold mb-3">
            Movies & Shows
          </h2>
          <HorizontalCards data={info.combinedCredits.cast} />
          <div className="w-full flex justify-between">
            <h2 className="mt-5 text-xl text-zinc-200 font-semibold mb-3">
              Acting
            </h2>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div
            className="list-disc text-zinc-400 mt-5 w-full h-[50vh] overflow-x-hidden overflow-y-auto 
            shadow-xl shadow-[rgba(255,255,255,.3)] border-2 hover:border-zinc-900 p-5"
          >
            {info[`${category}Credits`]?.cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white hover:bg-zinc-950  duration-300 cursor-pointer p-5"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span>
                    {c.name ||
                      c.title ||
                      c.original_name ||
                      c.original_title ||
                      "Untitled"}
                  </span>
                  <span className="block ml-6">{c.character && `Character Name: ${c.character}`}</span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
