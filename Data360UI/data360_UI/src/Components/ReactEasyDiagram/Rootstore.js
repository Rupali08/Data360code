import { useRef } from "react";

let storeRef=[]
export const Rootstore=()=>
{
    storeRef=useRef();
    return storeRef;
}
export const RootstoreRef=()=>
{
    return storeRef.current;
}