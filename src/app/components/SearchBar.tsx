"use client";

import React, { useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch: (search: string) => void }) => {
  const [search, setSearch] = useState("");
  return (
    <div className="flex items-center p-0 bg-gray-800 rounded-lg mb-4">
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Describe to generate..."
        className="flex-grow p-2 bg-gray-800 text-lg rounded-l-full "
      />
      <button className="p-2 bg-gray-800 rounded-r-full text-lg" onClick={() => onSearch(search)}>Generate</button>
    </div>
  );
};

export default SearchBar;