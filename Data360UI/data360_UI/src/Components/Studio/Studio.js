import React from "react";
import './studio.css'
import { StudioDiagramContext } from "./StudioDiagramContext";
import { Rightbar } from "./Rightbar/Rightbar";
export const Studio=(props)=>
{
    return(<>
    <div id='diagram'>
    <div id='diagram-content'>
        <StudioDiagramContext page={props.page}/>
        <Rightbar page={props.page}/>
    </div>
    </div>
    </>)
}