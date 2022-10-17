import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PagesPromotionSearch from "./Promotion/Search";
import PagesPromotionForm from "./Promotion/Form";


const Root = () => {
return (
    <Router>
        <Routes>
            <Route path="/" element={<PagesPromotionSearch/>}> </Route>
            <Route path="/create" element={<PagesPromotionForm/>}> </Route>
            <Route path="/edit/:id" element={<PagesPromotionForm/>} ></Route>
        </Routes>
    </Router>

)

}

export default Root;