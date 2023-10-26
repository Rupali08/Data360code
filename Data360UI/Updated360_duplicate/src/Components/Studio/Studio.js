import React from "react";
import {DiagramContext} from 'react-easy-diagram'
import './studio.css'
import { StudioMainContent } from "./StudioMainContent/StudioMainContent";
import { Rootstore } from "../ReactEasyDiagram/Rootstore";
export const Studio=()=>
{
    return(<>
    <div id='diagram'>
    <div id='diagram-content'>
        <DiagramContext
    initState={{
        nodes: [
          {
            id: 'start',
            label: 'Start',
            position: [300, 0],
            type: 'output_horizontal',
          },
          {
            id: 'stop',
            label: 'Stop',
            position: [1000, 0],
            type: 'input_horizontal',
          }
        ],
      }}
      storeRef={Rootstore()}
    >
    <StudioMainContent/>
    </DiagramContext>
    </div>
    </div>
    </>)
}