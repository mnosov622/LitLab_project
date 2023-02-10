import "../css/component/featuredInfo.css";

//import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">TOTAL COURSES</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2,415</span>
          <span className="featuredMoneyRate">
            <span className="featuredIcon negative" />
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">TOTAL STUDENTS</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">4,415</span>
          <span className="featuredMoneyRate">
            <span className="featuredIcon negative" />
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">TOTAL INSTRUCTORS</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2,225</span>
          <span className="featuredMoneyRate">
            <span className="featuredIcon" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default FeaturedInfo;
