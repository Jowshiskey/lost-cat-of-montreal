import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const SearchAndFoundBoard = () => {
  const [updateAllReport, setUpdateAllReport] = useState(true);
  const [allReport, setAllReport] = useState([]);

  useEffect(() => {
    if (updateAllReport) {
      fetch("/report")
        .then((response) => response.json())
        .then((parsed) => {
            if(parsed.status === 200){
                console.log(parsed);
                setAllReport(parsed.data);
                setUpdateAllReport(false);
            } else {
                console.log(parsed.message)
            }
        }, []);
    }
  });

  return (
    <div className="report_main_div main">
      {allReport.map((x) => {
        return (
          <div key={x._id}>
            <p>{x.name}</p>
            <p>{x.color}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SearchAndFoundBoard;
