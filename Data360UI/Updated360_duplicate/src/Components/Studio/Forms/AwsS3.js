import React, { useState } from "react";
import { Form } from "react-bootstrap";
export const AwsS3= (props)=>
{
    const [bucketName,setBucketName]=useState('')
    const [json,setJson]=useState({'bucketName':''})
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
        
    
        props.check(temp,props.value)
    }
    return(
        <div>
            <p>AWS S3 Configuration</p>
            <Form>
                <Form.Control type="text" placeholder="Enter Bucket Name" value={bucketName}  autoComplete="off" onChange={(e)=>onChangeValue('bucketName',e.target.value)}></Form.Control>
            </Form>
        </div>
    )
}