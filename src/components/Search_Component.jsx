import React, { useState } from "react";

const Search_Component = ({ all_restaurants, set_filtered_restaurants, setIsFiltered, search_term, set_search_term }) => {
  

  const handle_change = (e) => {
    set_search_term(e.target.value);
  };

  const handle_search = () => {
    const search_results = all_restaurants.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(search_term.toLowerCase())
    );
    set_filtered_restaurants(search_results);
    setIsFiltered(true);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for restaurants..."
          value={search_term}
          onChange={handle_change}
        />
      </div>
      <div className="search-btn">
        <button onClick={handle_search}>Search</button>
      </div>
    </div>
  );
};

export default Search_Component;
