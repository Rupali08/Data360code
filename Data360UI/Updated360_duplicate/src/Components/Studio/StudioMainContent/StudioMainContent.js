import React from "react";
import { container_class } from "../../ReactEasyDiagram/ContainerCss";
import { DigramInner } from "react-easy-diagram";
import { Sidebar } from "../Sidebar/Sidebar";

export const StudioMainContent=()=>
{
    return(
    <>
    <div className={container_class}>
    <DigramInner/>
    <div>
        <Sidebar/>
    </div>
    </div>
    </>)
}