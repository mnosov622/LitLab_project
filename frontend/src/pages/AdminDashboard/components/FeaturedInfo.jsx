import { useEffect, useState } from "react";
import "../css/component/featuredInfo.css";

//import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

function FeaturedInfo() {
  const [usersData, setUsersData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [usersAmount, setUsersAmount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [instructorsCount, setInstructorsCount] = useState(0);
  const [coursesAmount, setCoursesAmount] = useState(0);

  useEffect(() => {
    //getting all users
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsersData(data);
        console.log(
          "single",
          data.map((d) => d)
        );

        let studentsCount = 0;
        let instructorsCount = 0;
        data &&
          data.map((d) => {
            if (d?.isLearner) {
              studentsCount++;
            } else if (d?.isCreator) {
              instructorsCount++;
            }
            return 0;
          });

        setStudentsCount(studentsCount);
        setInstructorsCount(instructorsCount);
        setUsersAmount(data.length);
      });

    //getting all courses
    fetch("http://localhost:8000/courses")
      .then((res) => res.json())
      .then((data) => {
        setCoursesData(data);
        setCoursesAmount(data.length);
      });
  }, []);

  return (
    <div className="featured mt-3">
      <div className="featuredItem">
        <span className="featuredTitle">TOTAL COURSES</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{coursesAmount}</span>
          <span className="featuredMoneyRate">
            <span className="featuredIcon negative" />
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">TOTAL USERS</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{usersAmount}</span>
          <span className="featuredMoneyRate">
            <span className="featuredIcon" />
          </span>
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">TOTAL STUDENTS</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{studentsCount}</span>
          <span className="featuredMoneyRate">
            <span className="featuredIcon negative" />
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">TOTAL INSTRUCTORS</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{instructorsCount}</span>
          <span className="featuredMoneyRate">
            <span className="featuredIcon" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default FeaturedInfo;
