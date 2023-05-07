import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFullscreen } from "react-icons/bs";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logout, nightMode } from "../reducer/actions";
import "../../src/index.css";

export default function Header() {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const nightModeStatus = useSelector((state) => state.nightMode);

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
  }

  function handleNightMode() {
    dispatch(nightMode());
  }

  return (
    <div className="back h-44  p-5">
      <div className="flex items-center justify-between  ">
        <div className="flex text-white gap-3 ">
          <BsFullscreen className="text-xl mr-4" />
          <AiOutlineSearch className="text-2xl" />
        </div>
        <div className="flex text-white gap-3 mr-7 items-center ">
          <MdOutlineLocalPostOffice className="text-3xl mr-3" />
          <div className="dark-mode__toggle">
            <div
              onClick={handleNightMode}
              className={nightModeStatus ? "toggle toggled" : "toggle"}
            />
          </div>
          <div>
            <p>{currentUser.username}</p>
          </div>
          <div>
            <img className="rounded-full  w-8" src={currentUser.photo}></img>
          </div>
          <div>
            <button type="submit" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 flex text-white justify-between">
        <div className="text-2xl font-bold">INTERBANK</div>
        <div className="flex text-lg gap-5">
          <div>Member</div>
          <div>Member Portal</div>
        </div>
      </div>
    </div>
  );
}
