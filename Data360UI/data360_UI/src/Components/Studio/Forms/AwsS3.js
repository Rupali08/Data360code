import React, { useState } from "react";
import { Form } from "react-bootstrap";
export const AwsS3= (props)=>
{
    const [bucketName,setBucketName]=useState('')
    const [region,setRegion]=useState('')
    const [accessKey,setAccessKey]=useState('')
    const [secertAccessKey,setsecertAccessKey]=useState('')
    const [json,setJson]=useState({'bucketName':'','region':'','accessKey':'','secertAccessKey':''})
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
            <p>AWS S3 Configuration</p>
            <Form>
                <Form.Control type="text" placeholder="Enter AWS Name" value={bucketName}  autoComplete="off" onChange={(e)=>onChangeValue('bucketName',e.target.value)}></Form.Control>
                
                </Form> 
        </div>
    )
}
                // code for region, access key and secret 
                //<br></br>
                //<Form.Control type="text" placeholder="Enter Region" value={region} autoComplete="off"  onChange={(e)=>onChangeValue('region',e.target.value)}></Form.Control>
                //  <br></br>
                //<Form.Control type="text" placeholder="Enter Access Key" value={accessKey} autoComplete="off" onChange={(e)=>onChangeValue('accessKey',e.target.value)}></Form.Control>
                //<br></br>
                //<Form.Control type="text" placeholder="Enter Secert Access Key" value={secertAccessKey} autoComplete="off" onChange={(e)=>onChangeValue('secertAccessKey',e.target.value)}></Form.Control>