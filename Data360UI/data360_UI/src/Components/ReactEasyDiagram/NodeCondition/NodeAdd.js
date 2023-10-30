export const NodeAdd=()=>
{
    const nodeAdd={onNodesAddResult: (info, store) => {
        info.addedNodes.forEach((n)=>
    {
        n.setData('')
    })
    }
    }
    return nodeAdd
}