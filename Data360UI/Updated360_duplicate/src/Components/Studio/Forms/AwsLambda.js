import React, { useState } from "react";
import { Form } from "react-bootstrap";
export const AwsLambda= (props)=>
{
    const runtimeOptions = ["nodejs14.x", "python3.8", "java11"];
    const [functionName,setfunctionName]=useState('')
    const [runtime,setRuntime]=useState('nodejs14.x')
    const [accountid,setAccountid]=useState('')
    const [handlerName,sethandlerName]=useState('')
    const [IAMRole,setIAMRole]=useState('')
    const [s3bucketName,sets3bucketName]=useState('')
    const [s3Key,sets3Key]=useState('')
    const [json,setJson]=useState({'functionName':'','runtime':runtime,'handlerName':'','IAMRole':'','accountid':'','s3bucketName':'','s3Key':''})
    const onChangeValue=(name,val)=>
    {
        let temp={}
        if(name==='functionName')
        {
            setJson({...json,'functionName': val,})
            setfunctionName(val)
            temp=json
            temp['functionName']=val
        }
        if(name==='runtime')
        {
            console.log(val)
            setJson({...json,'runtime': val,})
            setRuntime(val)
            temp=json
            temp['runtime']=val
        }
        if(name==='handlerName')
        {
            setJson({...json,'handlerName': val,})
            sethandlerName(val)
            temp=json
            temp['handlerName']=val
        }
        if(name==='accountid')
        {
            setJson({...json,'accountid': val,})
            setAccountid(val)
            temp=json
            temp['accountid']=val
        }
        if(name==='IAMRole')
        {
            setJson({...json,'IAMRole': val,})
            setIAMRole(val)
            temp=json
            temp['IAMRole']=val
        }
        if(name==='s3bucketName')
        {
            setJson({...json,'s3bucketName': val,})
            sets3bucketName(val)
            temp=json
            temp['s3bucketName']=val
        }
        if(name==='s3Key')
        {
            setJson({...json,'s3Key': val,})
            sets3Key(val)
            temp=json
            temp['s3Key']=val
        }
        props.check(temp,props.value)
    }
    return(
        <div>
            <p>AWS Lambda Configuration</p>
            <Form>
                <Form.Control type="text" placeholder="Enter Lambda Function Name" value={functionName}  autoComplete="off" onChange={(e)=>onChangeValue('functionName',e.target.value)}></Form.Control>
                <br></br>
                <Form.Control as="select" value={runtime} autoComplete="off" onChange={(e) => onChangeValue('runtime', e.target.value)}>
                    {runtimeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </Form.Control>
                <br></br>
                <Form.Control type="text" placeholder="Enter Handler name" value={handlerName} autoComplete="off" onChange={(e)=>onChangeValue('handlerName',e.target.value)}></Form.Control>
                <br></br> 
                <Form.Control type="text" placeholder="Enter Accountid" value={accountid} autoComplete="off" onChange={(e)=>onChangeValue('accountid',e.target.value)}></Form.Control>
                <br></br>
                <Form.Control type="text" placeholder="Enter IAM Role (ARN)" value={IAMRole} autoComplete="off" onChange={(e)=>onChangeValue('IAMRole',e.target.value)}></Form.Control>
                <br></br>
                <Form.Control type="text" placeholder="Enter S3 Bucket name" value={s3bucketName} autoComplete="off" onChange={(e)=>onChangeValue('s3bucketName',e.target.value)}></Form.Control>
                <br></br>
                <Form.Control type="text" placeholder="Enter s3 Key" value={s3Key} autoComplete="off" onChange={(e)=>onChangeValue('s3Key',e.target.value)}></Form.Control>
                
                </Form>
        </div>
    )
}