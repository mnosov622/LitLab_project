import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CourseCard from '../../components/CourseCards/CourseCard'; 
import searchValue from './SearchBar.jsx';

function SearchResults(props) {
  const { searchQuery } = props;
  //const location = useLocation();
  //const [searchValue, setSearchValue] = useState("");
  //const searchValue = new URLSearchParams(location.search).get("/search-result");
  //const CourseCards = location.state.CourseCards;

  return (
    <>
    
      <h1>Results for {searchQuery}</h1>
      <CourseCard />
      
    </>
  );
}

export default SearchResults;
