import React, { useEffect } from "react";

const LearnerCourses = () => {
  useEffect(() => {
    console.log("Component init");
  });

  return (
    <div style={{ paddingLeft: "20%", paddingTop: "5%" }}>LearnerCourses</div>
  );
};

export default LearnerCourses;
