import React, { useState } from "react";
import { RootstoreRef } from "../../ReactEasyDiagram/Rootstore";
import './rightbar.css'
import { RightbarDetails } from "./RightbarDetails/RightbarDetails";
export let CallRightbar={}
export const Rightbar=(props)=>
{
  const [isRightbar,setIsRightbar]=useState(false)
  const [nodeData,setNodeData]=useState([])
  const [nodeName,setNodeName]=useState('')
  const [nodeId,setNodeId]=useState('')
  CallRightbar=()=>
  {
    const selectedNode=RootstoreRef().selectionState.selectedNodes
   if(selectedNode.length===1)
   {
    console.log(selectedNode[0])
    setNodeName(selectedNode[0].label)
    setNodeData(selectedNode[0].data)
    setNodeId(selectedNode[0].id)
        let diagramAssets=document.querySelector('.react_fast_diagram_DiagramInner')
        diagramAssets.onclick=function()
        {
            setIsRightbar(false);
        }
   }
    setIsRightbar(true)
  }
    return(<>
        
      <div className="rightbar-container">
      {isRightbar?
      <RightbarDetails name={nodeName} data={nodeData} id={nodeId}/>
      :<div className="component-details-static">{props.page==='azure'?'Azure ':'Aws '}Component Details</div>}
        </div>
    </>)
}