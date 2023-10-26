import React, { useState } from "react";
import { Form } from "react-bootstrap";
export const JSON= (props)=>
{
    const [bucketName,setBucketName]=useState('')
    const [region,setRegion]=useState('')
    const [accessKey,setAccessKey]=useState('')
    const [secertAccessKey,setsecertAccessKey]=useState('')
    const [json,setJson]=useState({'bucketName':'','region':'','accessKey':'','secertAccessKey':'','uploadFileName':'','uploadBase64':''})
    const onChangeValue=(name,val)=>
    {
        let temp={}
        if(name==='bucketName')
        {
            setJson({...json,'bucketName': val,})
            setBucketName(val)
            temp=json
            temp['bucketName']=val
        }
        if(name==='file')
        {
            if (val.target.files && val.target.files[0]) {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = reader.result;  
                    setJson({...json,'uploadBase64': base64,})
                    setJson({...json,'uploadFileName':val.target.files[0].name})
                    temp=json
                    temp['uploadBase64']=base64
                    temp['uploadFileName']=val.target.files[0].name
                };
            
                if (val.target.files[0]) {
                  reader.readAsDataURL(val.target.files[0]);
                }
            }
        }
        if(name==='region')
        {
            setJson({...json, 'region': val,})
            setRegion(val)
            temp=json
            temp['region']=val
        }
        if(name==='accessKey')
        {
            setJson({...json, 'accessKey': val,})
            setAccessKey(val)
            temp=json
            temp['accessKey']=val
        }
        if(name==='secertAccessKey')
        {
            setJson({...json, 'secertAccessKey': val,})
            setsecertAccessKey(val)
            temp=json
            temp['secertAccessKey']=val
        }
        props.check(temp,props.value)
    }
    return(
        <div>
            <p>JSON Configuration</p>
            <Form>
                <Form.Control type="file" onChange={(e)=>onChangeValue('file',e)}></Form.Control>
                <br></br>
                <Form.Control type="text" placeholder="Enter AWS Name" value={bucketName}  autoComplete="off" onChange={(e)=>onChangeValue('bucketName',e.target.value)}></Form.Control>
                <br></br>
                <Form.Control type="text" placeholder="Enter Region" value={region} autoComplete="off"  onChange={(e)=>onChangeValue('region',e.target.value)}></Form.Control>
                <br></br>
                <Form.Control type="text" placeholder="Enter Access Key" value={accessKey} autoComplete="off" onChange={(e)=>onChangeValue('accessKey',e.target.value)}></Form.Control>
                <br></br>
                <Form.Control type="text" placeholder="Enter Secert Access Key" value={secertAccessKey} autoComplete="off" onChange={(e)=>onChangeValue('secertAccessKey',e.target.value)}></Form.Control>
                </Form>
        </div>
    )
}