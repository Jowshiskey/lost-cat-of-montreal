import ReactDOM from "react-dom/client";
import App from "./App";
import UserProvider from "./Context/UserContext.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserProvider>
        <App />
    </UserProvider> 
);
