import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CourseCard from '../../components/CourseCards/CourseCard'; 
import searchValue from './SearchBar.jsx';

function SearchResults() {
  //const location = useLocation();
  //const [searchValue, setSearchValue] = useState("");
  //const query = new URLSearchParams(location.search).get("/search-result");
  //const CourseCards = location.state.CourseCards;

  return (
    <>
      <h1>Results for {searchValue}</h1>
      <div>
    <CourseCard/> 
      </div>
    </>
  );
}

export default SearchResults;
