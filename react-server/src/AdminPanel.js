import React from "react";
import DataPanel from "./Containers/DataPanel";
import Header from "./Header/Header";
import Navbar from "./Navbar/navbar";

export default function AdminPanel() {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 relative bg-gray-200">
        <Header />
        <DataPanel />
      </div>
    </div>
  );
}
