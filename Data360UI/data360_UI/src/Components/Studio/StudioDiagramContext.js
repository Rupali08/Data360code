import React from "react";
import { Rootstore } from "../ReactEasyDiagram/Rootstore";
import { NodeCondition } from "../ReactEasyDiagram/NodeCondition";
import { DiagramContext } from "react-easy-diagram";
import { StudioMainContent } from "./StudioMainContent/StudioMainContent";
export const StudioDiagramContext=(props)=>
{
    return(<>
            <DiagramContext
        settings={NodeCondition()}
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
    <StudioMainContent page={props.page}/>
    </DiagramContext>
    </>)
}