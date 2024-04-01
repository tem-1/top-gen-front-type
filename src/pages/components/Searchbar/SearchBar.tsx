import React from "react";
import { Search } from "lucide-react";
import { useCourseContext } from "@/states/state";

const SearchBar = ({ onSearch }: any) => {
  const { additional } = useCourseContext();
  const dynamicBackgroundStyle = {
    background: `linear-gradient(to right, ${additional?.colorFrom}, ${additional?.colorTo})`,
    borderTop: "1px solid #d1d5db", // Equivalent to 'border-gray-300 border-t' in TailwindCSS
  };
  return (
    <div className="flex full justify-center p-4">
      <div
        style={dynamicBackgroundStyle}
        className="  p-6 flex  w-[20%] h-12 rounded-l-lg items-center justify-center text-white"
      >
        <span className=" hidden md:block">Top Genius</span>
      </div>
      <input
        type="text"
        className="w-[100%]  border-gray-400 px-10"
        placeholder="Сургалт хайх"
        onChange={(event) => onSearch(event)}
      />
      <div
        style={dynamicBackgroundStyle}
        className="  flex  w-[50px] rounded-r-lg items-center justify-center"
      >
        <Search className="text-white " />
      </div>
    </div>
  );
};

export default SearchBar;
