import React, { useState } from "react";
import './sidebar.css'
import {Accordion, Card, FormControl, Modal, ModalFooter} from 'react-bootstrap'
//import Datasource from './images/datasource.png'
//import DatasourceSide from './images/datasource-side.png'
import { saveAs } from 'file-saver';
import { DragAndDropItem, createNodeOnDrop } from "react-easy-diagram";
import { RootstoreRef } from "../../ReactEasyDiagram/Rootstore";
import { AwsS3 } from "../Forms/AwsS3";
import { ScriptPost } from "../../../Services/Scripts Service/ScriptPost";
import { JSON } from "../Forms/JSON";
import {AwsLambda} from "../Forms/AwsLambda";
import { AwsGlue } from "../Forms/AwsGlue";
export const Sidebar=()=>
{
    const [NodeVal,setNodeVal]=useState([])
    let ValueList={}
    const SampleJson=['Data Sources','Data Storage','Data Ingestion','Data Quality','Data Transformation','Data Analysis','Data Governance']
    const SampleKeyValue={'Data Sources':['json','CSV'],'Data Storage':['S3','AWS RDS'],'Data Ingestion':['Lambda'],'Data Quality':['AWS Trusted Advisor','AWS Audit Manager']
,'Data Transformation':['Glue'],'Data Analysis':['AWS Quicksight'],'Data Governance':['Catlog']}
    const [popup,setPopup]=useState(false);
    // const [activeTools,setActiveTools]=useState('');
    // const [activeSidebar,setActiveSidebar]=useState(false)
    // const onOpenSidebarSlide=(tool)=>
    // {
    //     if(activeTools!==tool)
    //     {
    //     setActiveTools(tool);
    //     setActiveSidebar(true);
    //     }
    //     else
    //     {
    //     setActiveTools('');
    //     setActiveSidebar(false);
    //     }
    // }
    const CheckValidate=(val,n)=>
    {
        console.log(val,n)
        ValueList[n[1]]=val
    }
    const Download= async()=>
    {
        console.log(ValueList)
        console.log(NodeVal)

        let postJson={}
        let postJsonList=[{Start:''}]

        NodeVal.map((n)=>
        {
            let temp={}
            temp[n[0]]=ValueList[n[1]]
            postJsonList.push(temp)
            return true
        })

        postJsonList.push({Stop:''})
        postJson['Flow']=postJsonList
        console.log("0000000000000000000000",postJson)

        const data=await ScriptPost(postJson)
        console.log(data.data)
        if(data.data!=='')
        {
            console.log(data.data)
        // const jsonBlob = new Blob([JSON.stringify(data.data, null, 2)], { type: "application/json" });
        const jsonBlob = new Blob([(data.data)], { type: "application/json" });
        saveAs(jsonBlob,"Scripts.json");
        }
        setPopup(false);
    }
    const Validate=()=>
    {
        const data=RootstoreRef();
        const NodesList=[]
        let i='start'
        let startId='start'
        let count =1
        while(i==='start')
        {
            let nodeValue=''
            if(startId==='start' || startId==='stop')
            {
            if(data.linksStore.getNodeLinks(startId)[0]===undefined)
            {
                alert('Connect start and Stop before Validate');
                i='stop'
            }
            else
            {
            nodeValue=data.nodesStore.getNode(data.linksStore.getNodeLinks(startId)[0].targetEndpoint.nodeId)
            if(nodeValue.label!=='Stop')
            {
                NodesList.push([nodeValue.label,count,''])
                count++
            }
            }
            }
            else
            {
            if(data.linksStore.getNodeLinks(startId)[1]===undefined)
            {
                alert('Connect the Node till stop before Validate');
                i='stop'
            }
            else
            {
            nodeValue=data.nodesStore.getNode(data.linksStore.getNodeLinks(startId)[1].targetEndpoint.nodeId)
            if(nodeValue.label!=='Stop')
            {
                NodesList.push([nodeValue.label,count])
                count++
            }
            }
            }
            startId=nodeValue.id
            if(startId==='stop')
            {
                console.log(NodesList)
                setNodeVal(NodesList)
                i='stop'
                setPopup(true);
            }
        }
    }
    return(
        <>
        <div className="sidebar">
        <div className="sidebar-header">
            All Components
        </div>
        <FormControl
          type="text"
          placeholder='&#xF002; Search'
          className="sidebar-text"
          style={{fontFamily:'Arial, FontAwesome'}}
        />
        <div className="scrollbar-side">
        {/* {SampleJson.length>0?
        SampleJson.map((n)=>
        {
            return(<div className={activeTools===n?"sidebar-components-active":'sidebar-components'} onClick={()=>onOpenSidebarSlide(n)}>
            <img src={Datasource} alt="" width="20" height="20"/> {n}
            </div>)
        })
        :''} */}
        {SampleJson.length>0?SampleJson.map((n,i)=>
        {
            return(<Accordion className="sidebar-normal" key={i} defaultActiveKey={["0"]}>
                <Accordion.Item>
                    <Card>
                        <Accordion.Header>{n}</Accordion.Header>
                        <Accordion.Body>{Object.keys(SampleKeyValue).includes(n)?
                        SampleKeyValue[n].map((key)=>
                        {
                            return( <DragAndDropItem draggable={
                            key } onDrop={createNodeOnDrop({ type: 'input_output_horizontal', label:key })}/>)
                        })
                        :''}</Accordion.Body>
                    </Card>
                </Accordion.Item>
            </Accordion>)
        }):''}
        </div>
        <Modal contentClassName="content-modal-form-body" show={popup} >
            <Modal.Header closeButton onClick={()=>setPopup(false)}></Modal.Header>
            <Modal.Body className="model-form-body">
                <p>Pipeline Details</p>
                <div>
                    {NodeVal.map((n)=>
                    {
                        if(n[0].includes('S3'))
                        {
                            return(<AwsS3 value={n} check={CheckValidate}/>)
                        }
                        else if(n[0].includes('Lambda'))
                        {
                            return(<AwsLambda value={n} check={CheckValidate}/>)
                        }
                        else if(n[0].includes('Glue'))
                        {
                            return(<AwsGlue value={n} check={CheckValidate}/>)
                        }
                        else
                        {
                            return ''
                        }
                    })}
                <br></br>
                </div>
            </Modal.Body>
            <ModalFooter>
            <div  className="template-img">
                    <button className="btn btn-primary" onClick={Download}>Download Script</button>
                </div>
            </ModalFooter>
        </Modal>
        <div className="validate-container">
            <div className="empty-container"></div>
        <div className="validate-button-container"><button style={{width:'110px',background:'#EDF2F7',border:'1px solid rgb(0, 0, 0, 0.1)'}} onClick={()=>Validate()} className="btn">Validate</button></div></div>
        {/* {activeSidebar?
        <div className="sidebar-open">
            <div className="slider-header">{activeTools}</div>
            <div className="slider-hr"><hr></hr></div>
            <div className="components-container">
                <DragAndDropItem draggable={  <div className="components">
                <img src={DatasourceSide} alt="" width="40" height="40"/>
                <div className="components-text">CSV</div>    
                </div>} onDrop={createNodeOnDrop({ type: 'input_output_vertical', label:'CSV' })}/>
                <DragAndDropItem draggable={  <div className="components">
                <img src={DatasourceSide} alt="" width="40" height="40"/>
                <div className="components-text">JSON</div>    
                </div>} onDrop={createNodeOnDrop({ type: 'input_output_vertical', label:'JSON' })}/>
            </div>
        </div>:''} */}
        </div>
        </>
    )
}