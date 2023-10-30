import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Studio } from "../Studio/Studio";
import { SelectionScreen } from "../Selection Screen/SelectionScreen";
export const RouterMainPage=()=>
{
    return(<>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<SelectionScreen/>}></Route>
        <Route path="/azure" element={<Studio page={"azure"}/>}></Route>
        <Route path="/aws" element={<Studio page={"aws"}/>}></Route>
    </Routes>
    </BrowserRouter>
    </>)
}