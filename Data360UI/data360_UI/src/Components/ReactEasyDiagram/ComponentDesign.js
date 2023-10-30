import {
    Port,
  } from 'react-easy-diagram';
  import { observer } from 'mobx-react-lite';
  import './componentdesign.css'
import { CallRightbar } from '../Studio/Rightbar/Rightbar';
const NodeWithAzure = observer(
    ({ entity: node}) => {
      return (
        <div className={node.selected?'selected-azure-node':''}>
        <div className={'react_fast_diagram_NodeDefault azure-design'} onClick={()=>
          {
            node.selected ?CallRightbar():console.log('Hello')
          }
          }>{node.label}
          {Array.from(node.ports).map(([id]) => (
            <Port id={id} key={id} />
          ))}
        </div>
        </div>
      );
    }
  );
  const NodeWithAws = observer(
    ({ entity: node}) => {
      return (
        <div className={node.selected?'selected-aws-node':''}>
        <div className={'react_fast_diagram_NodeDefault aws-design'} onClick={()=>
          {
            node.selected ?CallRightbar():console.log('Hello')
          }
          }>{node.label}
          {Array.from(node.ports).map(([id]) => (
            <Port id={id} key={id} />
          ))}
        </div>
        </div>
      );
    }
  );
  export const ComponentDesign=()=>
{
    let Components={}
    //Port for DesignAzure
    const portforAzure=[{ id: 'left', position: 'left-center' },{ id: 'right', position: 'right-center'}]
    const portAzure={}
    portAzure['ports']=portforAzure

    //Component DesignAzure
    const AzureComponent={}
    let azureDesign={}
    AzureComponent['component']=NodeWithAzure
    AzureComponent['settings']=portAzure
    azureDesign=AzureComponent
        //Component DesignAws
        const AwsComponent={}
        let awsDesign={}
        AwsComponent['component']=NodeWithAws
        AwsComponent['settings']=portAzure
        awsDesign=AwsComponent
    Components={azureDesign,awsDesign}
    return Components
}