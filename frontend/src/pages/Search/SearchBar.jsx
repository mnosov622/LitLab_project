import React, { useState } from "react";
import { Link } from "react-router-dom";
import courses from "../../fakeData/courses.json";
import { getOptions } from "../../utils/getOptions";
import CourseDescription from "../CourseDescription/CourseDescription";
import SearchResults from "./SearchResults";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ small }) => {
  const [data, setData] = useState("");
  const [showList, setShowList] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    Navigate(`/search?q=${searchValue}`);
    setSearchValue("");
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="col-md-3">
      <form action="" onSubmit={handleSubmit}>
        <div className={`input-group ${small ? "w-75" : "w-100"}`}>
          <input
            type="search"
            value={searchValue}
            className={`form-control ${small ? "w-75" : "w-100"}  ${
              !small ? "mt-4" : ""
            }`}
            placeholder={`${
              small ? "Search" : "Search for your favourite courses"
            }`}
            aria-label="Search for your favourite courses"
            onChange={handleChange}
            onFocus={() => setShowList(true)}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
