import React from "react";
import { container_class } from "../../ReactEasyDiagram/ContainerCss";
import { DigramInner } from "react-easy-diagram";
import { Sidebar } from "../Sidebar/Sidebar";

export const StudioMainContent=(props)=>
{
    return(
    <>
    <div className={container_class} id={props.page==='azure'?'azure':'aws'}>
    <DigramInner/>
    <div>
        <Sidebar page={props.page}/>
    </div>
    </div>
    </>)
}