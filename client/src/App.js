import React from "react";
import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import Home from "./pages/Home";
import SearchAndFoundBoard from "./pages/SearchAndFoundBoard";
import FileAReport from "./pages/FileAReport/FileAReport.js";
import Login from "./pages/Login/Login.js"
import SignUp from "./pages/SignUp.js";
import UserProfile from "./pages/UserProfile.js";
import MyFirstMap from "./pages/FileAReport/MyFirstMap.js";
import Poster from "./pages/FileAReport/Poster.js";
import PreviewPoster from "./pages/FileAReport/PreviewPoster.js";
import MyReports from "./pages/MyReports.js";
import { FileAreportContext } from './Context/FileAreportContext.js';

const App = () => {

    const { previewMode, setPreviewMode } = React.useContext(FileAreportContext);

    if(!previewMode){
        return (
            <Router>
                <Header />
                <Switch>
                    <Route path="/" element={<Home />} />
                    <Route path="/report" element={<SearchAndFoundBoard />} />
                    <Route path="/fileAReport" element={<FileAReport />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/userProfile" element={<UserProfile />} />
                    <Route path="/map" element={<MyFirstMap />} />
                    <Route path="/createPoster" element={<Poster />} />
                    <Route path="/myReports" element={<MyReports />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Switch>
                {/* <Footer /> */}
            </Router>
            );
    } else {
        return (
            <Router>
                <Switch>
                    <Route path="/previewPoster" element={<PreviewPoster />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Switch>
            </Router>
            );
    }
    
};

export default App;