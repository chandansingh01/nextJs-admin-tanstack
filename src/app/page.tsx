import Image from "next/image";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import Modal from "./components/Modal";
import CardGrid from "./components/CardGrid";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col w-full p-4 relative">

      <CardGrid />
      {/* <Modal isOpen={true}/> */}
    </div>

  );
}
