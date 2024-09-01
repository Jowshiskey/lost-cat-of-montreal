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
                console.log(parsed.data);
                setAllReport(parsed.data);
                setUpdateAllReport(false);
            } else {
                console.log(parsed.message)
            }
        }, []);
    }
  });

  if(allReport){
    return (
      <div className="report_main_div main">
        <p>this is the search and found board</p>
        {allReport.map((x) => {
          return (
            <div key={x._id} className="board_main_poster_div">
              <div>
                <p>{x.profileName}</p>
                <p>{x.catColor}</p>
                <img src={x.catImage}></img>
              </div>
              <div>
                <button>report post</button>
                <button>share to social</button>
              </div>
              <div>
                <p>time elapse since creation : 00h:00</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
}

export default SearchAndFoundBoard;
