import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import Home from "./pages/Home";
import SearchAndFoundBoard from "./pages/SearchAndFoundBoard";
import FileAReport from "./pages/FileAReport";
import Login from "./Login.js"
import SignUp from "./SignUp.js";
import UserProfile from "./UserProfile.js";
const App = () => {

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
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Switch>
        {/* <Footer /> */}
    </Router>
    );
};

export default App;