import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import routes from "./routes";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <div className="container mt-3">
                <Routes>
                    {routes.map(({ path, element }) => {
                        return <Route key={path} path={path} element={element} />;
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
