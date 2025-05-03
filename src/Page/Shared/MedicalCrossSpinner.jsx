import React from "react";
import "./MedicalCrossSpinner.css";

const MedicalCrossSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="cssload-circle">
      <div className="cssload-up">
        <div className="cssload-innera"></div>
      </div>
      <div className="cssload-down">
        <div className="cssload-innerb"></div>
      </div>
    </div>
  );
};

export default MedicalCrossSpinner;
