import { ComponentDesign } from "./ComponentDesign";
import { NodeAdd } from "./NodeCondition/NodeAdd";

export const NodeCondition=()=>
{
    const design=ComponentDesign();
    let onNodesAddResult=NodeAdd().onNodesAddResult
    const settings = {
        nodes:{
          components:design
        },
        callbacks: {
            onNodesAddResult
        }
      }
    return settings
}