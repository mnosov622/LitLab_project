import '../css/component/featuredInfo.css'

//import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">COURSES</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2,415</span>
          <span className="featuredMoneyRate">
            <span  className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Number of pending</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">STUDENTS</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">4,415</span>
          <span className="featuredMoneyRate">
            <span className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Students compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">INSTRUCTOR</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2,225</span>
          <span className="featuredMoneyRate">
             <span className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Instructors compared to last month</span>
      </div>
    </div>
  );
}

export default FeaturedInfo;