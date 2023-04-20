import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CourseCard from "../../components/CourseCards/CourseCard";
import searchValue from "./SearchBar.jsx";
import SearchImage from "../../assets/search.png";

function SearchResults(props) {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchQuery = new URLSearchParams(location.search).get("q");
  useEffect(() => {
    setSearchValue(searchQuery);
    fetch(`http:/localhost:8000/search?q=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data);
      });
  }, [searchQuery]);

  return (
    <>
      <div className="row">
        <h2 className="fs-2 mt-4 mb-4">
          Results for <span className="text-primary">{searchValue}</span>
        </h2>
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((course) => (
            <>
              <CourseCard
                cardSmall
                key={course.id}
                id={course.id}
                name={course.name}
                teacherName={course.instructor}
                courseImage={`${course.courseImageURL}?t=${new Date().getTime()}`}
                price={course.price}
              />
            </>
          ))
        ) : (
          <div className="text-center fs-1 mt-5 mb-5 pb-5 d-flex justify-content-center align-items-center">
            <img src={SearchImage} alt="search" width={"50px"} height={"50px"} />
            &nbsp;&nbsp;
            <p>
              Sorry, we couldn't find course <span className="text-primary">{searchQuery}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchResults;
