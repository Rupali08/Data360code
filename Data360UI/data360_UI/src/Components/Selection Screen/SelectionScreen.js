import React, { useState } from "react";
import './selectionscreen.css'
import AWSImg from './images/logo.png'
import AzureImg from './images/azure.png'
import { useNavigate } from "react-router-dom";
export const SelectionScreen=()=>
{
    const navigate=useNavigate();
    return(<>
    <div className="selection-screen">
    <div className="selection-screen-container">
        <div id="s1">
            <div id="s1-1">
                Welcome to Cloud Services
            </div>
            <div id="s1-2">
                This Site helps you create pipeline using AWS or Azure Cloud Services. Choose AWS or Azure Cloud to create Pipeline
            </div>
        </div>
        <div id="s2">
            <div id="s2-1">
                <div><img src={AzureImg} height='100px'></img></div>
                <div><button className="btn" onClick={()=>{navigate('/azure')}}>Azure</button></div>
                <div>Create using Azure</div>
            </div>
            <div id="s2-2">
            -   <div><img src={AWSImg} height='100px'></img></div>
                <div><button className="btn" onClick={()=>{navigate('/aws')}}>AWS</button></div>
                <div>Create using AWS</div>
            </div>
        </div>
    </div>
    </div>
    </>)
}