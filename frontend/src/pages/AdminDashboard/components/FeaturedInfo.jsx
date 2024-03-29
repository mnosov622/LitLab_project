import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import "../css/component/featuredInfo.css";

//import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

function FeaturedInfo() {
  const [usersData, setUsersData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [usersAmount, setUsersAmount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [instructorsCount, setInstructorsCount] = useState(0);
  const [coursesAmount, setCoursesAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //getting all users
    setLoading(true);
    fetch("https://litlab-backend-v2.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        setUsersData(data);

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
    fetch("https://litlab-backend-v2.vercel.app/courses")
      .then((res) => res.json())
      .then((data) => {
        setCoursesData(data);
        setCoursesAmount(data.length);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="featured mt-3">
        <div className="featuredItem">
          <span className="featuredTitle">TOTAL COURSES</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">
              {loading ? (
                <ThreeDots
                  height="30"
                  width="40"
                  radius="9"
                  color="#0d6efd"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                coursesAmount
              )}
            </span>
            <span className="featuredMoneyRate">
              <span className="featuredIcon negative" />
            </span>
          </div>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">TOTAL USERS</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">
              {loading ? (
                <ThreeDots
                  height="30"
                  width="40"
                  radius="9"
                  color="#0d6efd"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                usersAmount
              )}
            </span>
            <span className="featuredMoneyRate">
              <span className="featuredIcon" />
            </span>
          </div>
        </div>

        <div className="featuredItem">
          <span className="featuredTitle">TOTAL STUDENTS</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">
              {loading ? (
                <ThreeDots
                  height="30"
                  width="40"
                  radius="9"
                  color="#0d6efd"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                studentsCount
              )}
            </span>
            <span className="featuredMoneyRate">
              <span className="featuredIcon negative" />
            </span>
          </div>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">TOTAL INSTRUCTORS</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">
              {loading ? (
                <ThreeDots
                  height="30"
                  width="40"
                  radius="9"
                  color="#0d6efd"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                instructorsCount
              )}
            </span>
            <span className="featuredMoneyRate">
              <span className="featuredIcon" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturedInfo;
