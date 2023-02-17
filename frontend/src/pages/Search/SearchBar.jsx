import React, { useState } from 'react';
import { Link } from "react-router-dom";
import courses from "../../fakeData/courses.json";
import { getOptions } from "../../utils/getOptions";
import CourseDescription from '../CourseDescription/CourseDescription';
//import SearchResults from './SearchResults';
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const [showList, setShowList] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const Navigate = useNavigate();

  /*const displayOptions = () => {
    const options = getOptions(search, courses);
    setData(options);
  };

  const searchForCourses = () => {
    displayOptions();
  };
*/
  const goToCourse = (id) => {
    window.location.href = `/course/${id}`;
  };
  //const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    Navigate(`/search-result?query=${searchValue}`);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="col-md-3">
              <form action="search-result"  onSubmit={handleSubmit}>
                <div className="input-group search">
                  <input
                    type="text"
                    id='input'
                    value={searchValue}
                    className="form-control w-100 mt-4"
                    placeholder="Search for your favourite courses"
                    aria-label="Search for your favourite courses"
                    //onKeyDown={searchForCourses}
                    onChange={handleChange}
                    onFocus={() => setShowList(true)}
                    //To fix search remove this line
                    //onBlur={() => setShowList(false)}
                  ></input>
                  {/* <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">
                      <i className="bi bi-search"></i>
                    </button>
                  </div> */}
                </div>
                {showList && (
                  <ul className="options">
                    {data &&
                      data.map((item) => (
                        <div className="">
                          <Link
                            to={`/course/${item.id}`}
                            key={item.id}
                            onClick={<CourseDescription/>}
                          >
                            <li className="item">
                              {item.name}
                              <p className="text-muted mt-1 mb-0">
                                By {item.instructor}
                              </p>
                            </li>
                          </Link>
                        </div>
                      ))}
                  </ul>
                )}
              </form>
              </div>

              
   
  );
}

export default SearchBar;
