import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }: any) => {
  return (
    <div className="flex full justify-center p-4">
      <div className=" mainColor p-6 flex  w-[20%] h-12 rounded-l-lg items-center justify-center text-white">
        <span className=" hidden md:block">Top Genius</span>
      </div>
      <input
        type="text"
        className="w-[100%]  border-gray-400 px-10"
        placeholder="Сургалт хайх"
        onChange={(event) => onSearch(event)}
      />
      <div className=" mainColor flex  w-[50px] rounded-r-lg items-center justify-center">
        <Search className="text-white " />
      </div>
    </div>
  );
};

export default SearchBar;
