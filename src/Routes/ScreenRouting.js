import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddContact from "../pages/AddContact/AddContact";
import EditContact from "../pages/EditContact/EditContact";
import HomePage from "../pages/HomePage/HomePage";

function ScreenRouting() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/home-page" element={<HomePage></HomePage>}></Route>
          <Route
            path="/add-contact"
            element={<AddContact></AddContact>}
          ></Route>
          <Route
            path="/edit-contact"
            element={<EditContact></EditContact>}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default ScreenRouting;
