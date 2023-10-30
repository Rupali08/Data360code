import React, { useState } from "react";
import { Form } from "react-bootstrap";

export const AwsGlue = (props) => {
  const [jobName, setJobName] = useState("");
  const [scriptLocation, setScriptLocation] = useState("");
  const [accountid, setAccountid] = useState("");
  const [iamRoleArn, setIamRoleArn] = useState("");
  const [json, setJson] = useState({"jobName":"","scriptLocation":"","accountid":"","iamRoleArn":"" });

  const onChangeValue = (name, val) => {
    let temp = {};
    if (name === "jobName") {
        setJson({ ...json, jobName: val });
        setJobName(val);
        temp=json
        temp['jobName']=val
    }
    if(name==='accountid')
        {
            setJson({...json,'accountid': val,})
            setAccountid(val)
            temp=json
            temp['accountid']=val
        }
    if (name === "scriptLocation") {
        setJson({ ...json, scriptLocation: val });
        setScriptLocation(val);
        temp=json
        temp['scriptLocation']=val
    } 
    if (name === "iamRoleArn") {
        setJson({ ...json, iamRoleArn: val });
        setIamRoleArn(val);
        temp=json
        temp['iamRoleArn']=val
    }

    props.check(temp, props.value);
  };

  return (
    <div>
      <p>AWS Glue ETL Configuration</p>
      <Form>
        <Form.Control
          type="text"
          placeholder="Enter Job Name"
          value={jobName}
          autoComplete="off"
          onChange={(e) => onChangeValue("jobName", e.target.value)}
        ></Form.Control>
        <br></br>
        <Form.Control
          type="text"
          placeholder="Enter Script Location"
          value={scriptLocation}
          autoComplete="off"
          onChange={(e) => onChangeValue("scriptLocation", e.target.value)}
        ></Form.Control>
        <br></br>
        <Form.Control type="text" placeholder="Enter Accountid" value={accountid} autoComplete="off" onChange={(e)=>onChangeValue('accountid',e.target.value)}></Form.Control>
        <br></br>
        <Form.Control
          type="text"
          placeholder="Enter IAM Role (ARN)"
          value={iamRoleArn}
          autoComplete="off"
          onChange={(e) => onChangeValue("iamRoleArn", e.target.value)}
        ></Form.Control>
      </Form>
    </div>
  );
};
