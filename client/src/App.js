import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import Home from "./pages/Home";
import SearchAndFoundBoard from "./pages/SearchAndFoundBoard";
import FileAReport from "./pages/FileAReport";
const App = () => {

    return (
    <Router>
        <Header />
        <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<SearchAndFoundBoard />} />
            <Route path="/fileAReport" element={<FileAReport />} />
            {/* <Route path="/product/:singleProduct" element={<ProductDetails />} /> */}
            {/* <Route path="/signin" element={<SignIn />} /> */}
            {/* <Route path="/cart" element={<Cart />} /> */}
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Switch>
        {/* <Footer /> */}
    </Router>
    );
};

export default App;