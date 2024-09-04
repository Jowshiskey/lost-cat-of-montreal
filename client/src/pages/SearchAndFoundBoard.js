import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FileAreportContext } from '../Context/FileAreportContext.js';
import { ReportStatusContext } from "../Context/ReportStatusContext.js";
// import { UserContext } from "../Context/UserContext.js";

const SearchAndFoundBoard = () => {
  const [updateAllReport, setUpdateAllReport] = useState(true);
  const [allReport, setAllReport] = useState([]);
  const { dataURL } = React.useContext(FileAreportContext);
  const { posterStatus,setPosterStatus } = React.useContext(ReportStatusContext);

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
    <div className="report_main_div_main">
      <p className="text"> there is no report to display. All Cat are Home safe ^^</p>
    </div> )
  } else {
    return (
      <div className="report_main_div_main">
        {allReport.map((x) => {
          return (
            <div key={x._id} className="board_main_poster_div">
              <div>
                <p className="text" style={{margin:"0",textAlign:"start"}}>👥 {x.profileName}</p>
                {x.posterStatus==="Found" && <p className="post_status_found">FOUND</p>}
                {x.posterStatus==="Dead" && <p className="post_status_close" style={{color:"red"}}>CLOSE</p>}
                {x.posterStatus==="Expire" && <p className="post_status_exp" style={{color:"orange"}}>..EXP..</p>}
                
                
                <p className="post_status"></p>
                {/* <img className="snf_poster_img"  src={x.catImage}></img> */}
                {x.posterStatus!=="Still looking" ? <img className="snf_poster_img"  src={x.catImage} style={{filter:"grayscale(100%)"}}></img> : <img className="snf_poster_img"  src={x.catImage}></img> }
                
              </div>
              <div>
                <button type="button" title="Report Post as offensive" >🚩</button>
                <button type="button" title="share to social">🔗</button>
                {/* <button type="button">Edit Post</button> */}
              </div>
              <div>
                <p className="text">{x.reward}</p>
                <p className="text">☎️ {x.profilePhoneNumber} ☎️</p>
                <p style={{textAlign:"center"}}>~ Additionnal Description ~</p>
                  <p className="text">{x.catAddInfo}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default SearchAndFoundBoard;
