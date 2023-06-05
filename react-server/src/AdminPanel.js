import React from "react";
import DataPanel from "./Containers/DataPanel";
import Header from "./Header/Header";
import Navbar from "./Navbar/navbar";
import { useSelector } from "react-redux";

export default function AdminPanel() {
  const nightMode = useSelector((state) => state.nightMode);
  return (
    <div className="flex">
      <Navbar />
      <div
        className={`flex-1 relative ${
          nightMode ? "bg-slate-500" : "bg-gray-200"
        } `}
      >
        <Header />
        <DataPanel />
      </div>
      s
    </div>
  );
}
