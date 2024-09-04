import ReactDOM from "react-dom/client";
import App from "./App";
import UserProvider from "./Context/UserContext.js";
import LogInProvider from "./Context/LogInContext.js";
import FileAreportProvider from "./Context/FileAreportContext.js";
import ReportStatusProvider from "./Context/ReportStatusContext.js";


ReactDOM.createRoot(document.getElementById("root")).render(
    <ReportStatusProvider>
        <FileAreportProvider>
            <LogInProvider>
                <UserProvider>
                    <App />
                </UserProvider> 
            </LogInProvider>
        </FileAreportProvider>
    </ReportStatusProvider>

);
