import React from "react";
import teacher from "../../assets/home_teacher.png";
import styles from "./styles.module.scss";

const Home = () => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className={styles.about}>
          <p className={styles.title}>Learn from certified professionals</p>
          <p className={styles.subtitle}>
            With LitLab you can learn any topic you want, get certification and
            connect with other learners.​
          </p>
          <div className="row">
            <div className="col-4">
              <button className="btn btn-lg btn-primary w-100">
                Start Learning
              </button>
            </div>
            <div className="col-6">
              <button className="btn btn-lg btn-outline-primary">
                Become content creator
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 offset-1">
        <img src={teacher} alt="Teacher" />
      </div>
    </div>
  );
};

export default Home;
