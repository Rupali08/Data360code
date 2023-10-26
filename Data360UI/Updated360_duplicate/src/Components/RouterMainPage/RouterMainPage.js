import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Studio } from "../Studio/Studio";
export const RouterMainPage=()=>
{
    return(<>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Studio/>}></Route>
    </Routes>
    </BrowserRouter>
    </>)
}