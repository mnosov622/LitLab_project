import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CourseCard from "../../components/CourseCards/CourseCard";
import searchValue from "./SearchBar.jsx";

function SearchResults(props) {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchQuery = new URLSearchParams(location.search).get("q");
  useEffect(() => {
    setSearchValue(searchQuery);
    fetch(`http://localhost:8000/search?q=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data);
        console.log("query data", data);
      });
  }, [searchQuery]);
  //const CourseCards = location.state.CourseCards;

  return (
    <>
      <h2 className="fs-2 mt-4 mb-4">
        Results for <span className="text-primary">{searchValue}</span>
      </h2>
      <div className="row">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((course) => (
            <CourseCard
              cardSmall
              key={course.id}
              id={course.id}
              name={course.name}
              teacherName={course.instructor}
              courseImage={`${course.courseImageURL}?t=${new Date().getTime()}`}
              price={course.price}
            />
          ))
        ) : (
          <p>Sorry, we couldn't find courses</p>
        )}
      </div>
    </>
  );
}

export default SearchResults;
