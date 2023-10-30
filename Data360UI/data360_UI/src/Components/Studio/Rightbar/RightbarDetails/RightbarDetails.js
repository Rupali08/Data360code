import React, { useState } from "react";
import { FormControl, FormSelect } from "react-bootstrap";
import './rightbardetails.css'
import { RootstoreRef } from "../../../ReactEasyDiagram/Rootstore";
export const RightbarDetails=(props)=>
{
    const [region,setRegion]=useState(props.data===''?'East US':props.data.region)
    const [replication,setReplication]=useState(props.data===''?'Locally-Redundant Storage (LRS)':props.data.replication)
    const [creationName,setCreationName]=useState((props.data==='' && props.name==='Resource Manager')?'':(props.data!=='' && props.name==='Resource Manager')?props.data.creationName:'');
    const [bucketName,setBucketName]=useState((props.data==='' && (props.name==='AWS S3'|props.name==='JSON'))?'':(props.data!=='' && (props.name==='AWS S3'|props.name==='JSON'))?props.data.bucketName:'');
    const [accessKey,setAccessKey]=useState((props.data==='' && (props.name==='AWS S3'|props.name==='JSON'))?'':(props.data!=='' && (props.name==='AWS S3'|props.name==='JSON'))?props.data.accessKey:'');
    const [secretAccessKey,setSecretAccessKey]=useState((props.data==='' && (props.name==='AWS S3'|props.name==='JSON'))?'':(props.data!=='' && props.name==='AWS S3')?props.data.secrectAccessKey:'');
    const [storageName,setStorageName]=useState((props.data==='' && props.name==='ADLS Gen2')?'':(props.data!=='' && props.name==='ADLS Gen2')?props.data.storageName:'');
    const regions=["Australia East","Australia Southeast","Brazil South","Canada Central","Canada East","Central US","China East","China North","China South","East Asia","East US","East US 2","Europe North","Europe West","France Central","France South","Germany Central","Germany Northeast","Hong Kong","India Central","India South","Japan East","Japan West","Korea Central","Korea South","Netherlands North","Norway East","Qatar Central","South Africa North","Southeast Asia","South Central US","South India","South Korea","Sweden Central","Switzerland North","Switzerland West","UK South","UK West","UAE North","US Central","US East","US East 2","US Gov Arizona","US Gov Iowa","US Gov Texas","US Gov Virginia","US West","US West 2","West Central US"]
    const replications=["Locally-Redundant Storage (LRS)",'Geo- Redundant Storage (GRS)','Zone-Redundant Storage (ZRS)','Zone-Redundant Storage (ZRS)','Geo-Zone-Redundant Storage (GZRS)']
    const [fileName,setUploadFileName]=useState('')
    const[fileBase64,setUploadBase64]=useState('')
    const dataRef=RootstoreRef();
    const onValueChange=(name,value)=>
    {
        const data={'region':region,'storage':storageName,'creation':creationName,'replication':replication,'bucketName':bucketName,'accessKey':accessKey,'secretAccessKey':secretAccessKey
    ,'fileBase64':fileBase64,'filename':fileName}
        if(name==='creation')
        {
            setCreationName(value)
            data.creation=value
        }
        else if(name==='file')
        {
            if (value.target.files && value.target.files[0]) {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = reader.result;  
                    data.fileBase64=base64
                    data.filename=value.target.files[0].name
                    setUploadBase64(base64);
                    setUploadFileName(value.target.files[0].name);
                };
            
                if (value.target.files[0]) {
                  reader.readAsDataURL(value.target.files[0]);
                }
            }
        }
        else if(name==='accessKey')
        {
            
            setAccessKey(value)
            data.accessKey=value
        }
        else if(name==='secretAccessKey')
        {
            setSecretAccessKey(value)
            data.secretAccessKey=value
        }
        else if(name==='bucketName')
        {
            setBucketName(value)
            data.bucketName=value
        }
        else if(name==='storage')
        {
            setStorageName(value)
            data.storage=value
        }
        else if(name==='region')
        {
            setRegion(value)
            data.region=value;
        }
        else if(name==='replication')
        {
            setReplication(value)
            data.replication=value
        }
        if(props.name==='Resource Manager')
        {
            dataRef.nodesStore.getNode(props.id).setData({'region':data.region,'creationName':data.creation})
        }
        else if(props.name==='ADLS Gen2')
        {
            dataRef.nodesStore.getNode(props.id).setData({'region':data.region,'replication':data.replication,'storageName':data.storage})
        }
        else if(props.name==='AWS S3')
        {
            dataRef.nodesStore.getNode(props.id).setData({'bucketName':data.bucketName,'region':data.region,'secrectAccessKey':data.secretAccessKey,'accessKey':data.accessKey})
        }
        else if(props.name==='JSON')
        {
            dataRef.nodesStore.getNode(props.id).setData({'bucketName':data.bucketName,'region':data.region,'secrectAccessKey':data.secretAccessKey,'accessKey':data.accessKey,'fileName':fileName,'fileBase64':fileBase64})
        }
    }
    return(
        <div className="rightbar-details">
            <div className="rightbar-heading"><span>{props.name}</span><span> - Details</span></div>
            <div className="rightbar-form-container">
                <div>
                <label>{props.name==='Resource Manager'?'Creation Name':props.name==='AWS S3'||props.name==='JSON'?'Bucket Name':'Storage Account Name'}</label>
                <FormControl
                value={props.name==='Resource Manager'?creationName:props.name==='AWS S3'||props.name==='JSON'?bucketName:storageName}
                onChange={(e)=>onValueChange(props.name==='Resource Manager'?'creation':props.name==='AWS S3'||props.name==='JSON'?'bucketName':'storage',e.target.value)}
                placeholder={props.name==='Resource Manager'?"Enter Creation Name":props.name==='AWS S3'||props.name==='JSON'?'Enter S3 Bucket Name':"Enter Storage Account Name"} type="text"/>
                </div>

                <div>
                    <label>Region</label>
                    <FormSelect as="select" placeholder="Select Region" value={region}
          onChange={e => {
            onValueChange('region',e.target.value);
          }}>
                        {regions.map((n)=>
                        {
                            return(<option value={n} >{n}</option>)
                        })}
                    </FormSelect>
                </div>

                {props.name==='ADLS Gen2'?<div>
                    <label>Replication</label>
                    <FormSelect as="select" placeholder="Select Replication" value={replication}
          onChange={e => {
            onValueChange('replication',e.target.value);
          }}>
                        {replications.map((n)=>
                        {
                            return(<option value={n} >{n}</option>)
                        })}
                    </FormSelect>
                </div>:''}
                {props.name==='JSON'?
                <div>
                     <label>File Upload</label>
                    <FormControl type="file"  onChange={(e)=>onValueChange('file',e)}/>
                </div>
                :''}
                {props.name==='AWS S3'||props.name==='JSON'?
                <div>
                <div>
                <label>Access Key</label>
                <FormControl
                value={accessKey}
                onChange={(e)=>onValueChange('accessKey',e.target.value)}
                placeholder={'Enter Access Key'} type="text"/>
                </div>
                <div>
                <label>Secret Access Key</label>
                <FormControl
                value={secretAccessKey}
                onChange={(e)=>onValueChange('secretAccessKey',e.target.value)}
                placeholder={'Enter Secret Access Key'} type="text"/>
                </div>
                </div>
                :
                ''}
            </div>
        </div>
    )
}