import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FileAreportContext } from '../Context/FileAreportContext.js';

const SearchAndFoundBoard = () => {
  const [updateAllReport, setUpdateAllReport] = useState(true);
  const [allReport, setAllReport] = useState([]);
  const { dataURL } = React.useContext(FileAreportContext);

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

  if(allReport.length<1){
    return (
    <div className="report_main_div main">
      <p>this is the search and found board</p>
      <p className="text"> there is no report to report. Get it ?</p>
    </div> )
  } else {
    return (
      <div className="report_main_div main">
        <p>this is the search and found board</p>
        {allReport.map((x) => {
          return (
            <div key={x._id} className="board_main_poster_div">
              <div>
                <p>{x.profileName}</p>
                <p>{x.catColor}</p>
                <img className="snf_poster_img" src={dataURL}></img>
              </div>
              <div>
                <button>report post</button>
                <button>share to social</button>
              </div>
              <div>
                <p>time elapse since creation in days</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default SearchAndFoundBoard;
